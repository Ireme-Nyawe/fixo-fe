import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  X,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Phone,
  Maximize,
  Minimize,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SupportPage: React.FC<any> = () => {
  const navigate = useNavigate();
  const userId = useRef<string>(crypto.randomUUID());
  const username = "Need-for-support";
  const [socket, setSocket] = useState<Socket | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [technician, setTechnician] = useState<string>("");
  const [technicianId, setTechnicianId] = useState<string>("");
  const [userFullScreen, setUserFullScreen] = useState<boolean>(false);
  const [techFullScreen, setTechFullScreen] = useState<boolean>(false);
  const [connectionState, setConnectionState] = useState<string>(
    "Waiting for support..."
  );

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const userVideoContainerRef = useRef<HTMLDivElement>(null);
  const techVideoContainerRef = useRef<HTMLDivElement>(null);
  const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);
    initializeMedia();
    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("Connected to signaling server");
      socket.emit("requestSupport", { userId: userId.current, username });
    });

    socket.on("supportAccepted", ({ technicianId, technicianName }) => {
      console.log("Support accepted by technician:", technicianName);
      setTechnician(technicianName);
      setTechnicianId(technicianId);
      setIsConnected(true);
      setConnectionState("Establishing connection...");
      createPeerConnection(technicianId);
    });

    socket.on("iceCandidate", ({ candidate }) => {
      console.log("Received ICE candidate from technician");
      if (!peerConnection.current || !candidate) return;

      peerConnection.current
        .addIceCandidate(new RTCIceCandidate(candidate))
        .then(() => {
          console.log("Successfully added ICE candidate");
        })
        .catch((e) => console.error("Error adding ice candidate:", e));
    });

    socket.on("offer", async ({ offer }) => {
      console.log("Received offer from technician");

      try {
        if (!peerConnection.current) {
          console.error("No peer connection exists when offer received");
          return;
        }
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        console.log("Remote description set successfully after offer");
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        console.log("Created and set local description (answer)");
        socket.emit("answer", {
          to: technicianId,
          answer,
        });
      } catch (error) {
        console.error("Error handling offer:", error);
      }
    });

    socket.on("supportEnded", () => {
      endCall();
    });

    // Cleanup function
    return () => {
      socket.off("connect");
      socket.off("supportAccepted");
      socket.off("iceCandidate");
      socket.off("offer");
      socket.off("supportEnded");
    };
  }, [socket, technicianId, localStream]);

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const createPeerConnection = (techId: string) => {
    console.log("Creating peer connection to connect with technician:", techId);
  
    const configuration = {
      iceServers: [
        { urls: "stun:global.stun.twilio.com:3478" },
        {
          urls: "turn:global.turn.twilio.com:3478?transport=udp",
          username: "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
          credential: "tE2DajzSJwnsSbc123",
        },
      ],
      iceCandidatePoolSize: 10,
      sdpSemantics: "unified-plan",
    };
  
    try {
      const pc = new RTCPeerConnection(configuration);
      peerConnection.current = pc;
  
      // Set up connection timeout
      const connectionTimeout = setTimeout(() => {
        if (
          pc.iceConnectionState !== 'connected' && 
          pc.iceConnectionState !== 'completed'
        ) {
          console.log("Connection timeout - consider using different ICE servers or restart");
          setConnectionState("Connection timeout");
        }
      }, 20000); // 20 seconds timeout
  
      pc.onconnectionstatechange = () => {
        console.log("Connection state changed:", pc.connectionState);
        setConnectionState(pc.connectionState);
  
        if (pc.connectionState === "connected") {
          console.log("WebRTC connection established successfully!");
          setConnectionState("Connected");
          clearTimeout(connectionTimeout);
        } else if (
          pc.connectionState === "failed" ||
          pc.connectionState === "disconnected" ||
          pc.connectionState === "closed"
        ) {
          setConnectionState("Connection failed or closed");
          // Consider attempting reconnection here
          console.log("Connection failed or closed, may need to reconnect");
        }
      };
  
      pc.oniceconnectionstatechange = () => {
        console.log("ICE connection state:", pc.iceConnectionState);
        
        if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
          clearTimeout(connectionTimeout);
        } else if (pc.iceConnectionState === 'failed') {
          console.log("ICE connection failed, attempting to restart ICE");
          try {
            pc.restartIce();
          } catch (error) {
            console.error("Error during ICE restart:", error);
          }
        } else if (pc.iceConnectionState === 'disconnected') {
          console.log("ICE connection disconnected, monitoring for recovery");
          // Start a timer to check if it recovers on its own
          setTimeout(() => {
            if (pc.iceConnectionState === 'disconnected') {
              console.log("ICE connection still disconnected, attempting restart");
              try {
                pc.restartIce();
              } catch (error) {
                console.error("Error during ICE restart:", error);
              }
            }
          }, 5000); // Wait 5 seconds before attempting restart
        }
      };
  
      pc.onicegatheringstatechange = () => {
        console.log("ICE gathering state:", pc.iceGatheringState);
        
        if (pc.iceGatheringState === 'complete' && 
            pc.iceConnectionState !== 'connected' && 
            pc.iceConnectionState !== 'completed') {
          console.log("Gathered all candidates but not connected - may indicate NAT/firewall issues");
        }
      };
  
      pc.onsignalingstatechange = () => {
        console.log("Signaling state:", pc.signalingState);
        
        if (pc.signalingState === 'closed') {
          console.log("Signaling state closed");
        }
      };
  
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          console.log("Adding local track to peer connection:", track.kind);
          pc.addTrack(track, localStream);
        });
      }
  
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          const candidateInfo = event.candidate.candidate || "unknown";
          const candidateType = event.candidate.type || "unknown";
          console.log(`ICE candidate (${candidateType}): ${candidateInfo}`);
          
          socket?.emit("iceCandidate", {
            to: techId,
            candidate: event.candidate,
          });
        } else {
          console.log("End of ICE candidates gathering");
        }
      };
  
      pc.ontrack = (event) => {
        console.log("Received remote track:", event.track.kind);
  
        if (remoteVideoRef.current && event.streams[0]) {
          console.log("Setting remote stream to video element");
          remoteVideoRef.current.srcObject = event.streams[0];
          setRemoteStream(event.streams[0]);
        }
      };
  
      // Add stats collection for diagnostics (optional)
      if (pc.getStats) {
        // Periodically collect connection stats
        const statsInterval = setInterval(async () => {
          if (pc.connectionState === 'connected') {
            try {
              const stats = await pc.getStats();
              let hasActiveCandidate = false;
              
              stats.forEach(report => {
                if (report.type === 'candidate-pair' && report.state === 'succeeded') {
                  hasActiveCandidate = true;
                  console.log('Active candidate pair:', report);
                }
              });
              
              if (!hasActiveCandidate && pc.connectionState === 'connected') {
                console.log("Connected but no active candidate pair found - possible issue");
              }
            } catch (error) {
              console.error("Error getting stats:", error);
            }
          }
        }, 10000); // Every 10 seconds
        
        // Clean up interval when connection closes
        pc.onconnectionstatechange = function() {
          if (pc.connectionState === 'closed' || pc.connectionState === 'failed') {
            clearInterval(statsInterval);
          }
        };
      }
  
      return pc;
    } catch (error) {
      console.error("Error creating peer connection:", error);
      setConnectionState("Error creating connection");
      return null;
    }
  };
  

  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        if (peerConnection.current && stream) {
          const senders = peerConnection.current.getSenders();
          const videoTrack = stream.getVideoTracks()[0];

          const videoSender = senders.find(
            (sender) => sender.track?.kind === "video"
          );

          if (videoSender && videoTrack) {
            videoSender.replaceTrack(videoTrack);
          }
        }

        setLocalStream(stream);
        setIsScreenSharing(false);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        if (peerConnection.current && stream) {
          const senders = peerConnection.current.getSenders();
          const videoTrack = stream.getVideoTracks()[0];

          const videoSender = senders.find(
            (sender) => sender.track?.kind === "video"
          );

          if (videoSender && videoTrack) {
            videoSender.replaceTrack(videoTrack);
          }
        }

        stream.getVideoTracks()[0].onended = async () => {
          await toggleScreenShare();
        };

        setLocalStream((prev) => {
          if (prev) {
            prev.getAudioTracks().forEach((track) => {
              stream.addTrack(track);
            });
          }
          return stream;
        });
        setIsScreenSharing(true);
      } catch (error) {
        console.error("Error sharing screen:", error);
      }
    }
  };

  const endCall = () => {
    socket?.emit("endSupport", { userId: userId.current });
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    localStream?.getTracks().forEach((track) => track.stop());
    setIsConnected(false);
    navigate("/");
  };

  const toggleUserFullScreen = () => {
    if (userVideoContainerRef.current) {
      if (!userFullScreen) {
        if (userVideoContainerRef.current.requestFullscreen) {
          userVideoContainerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setUserFullScreen(!userFullScreen);
    }
  };

  const toggleTechFullScreen = () => {
    if (techVideoContainerRef.current) {
      if (!techFullScreen) {
        if (techVideoContainerRef.current.requestFullscreen) {
          techVideoContainerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setTechFullScreen(!techFullScreen);
    }
  };
  console.log("stream remote", remoteStream?.getTracks());

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Support Session</h2>
          <button
            onClick={endCall}
            className="p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            ref={userVideoContainerRef}
            className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video"
          >
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
              You {isScreenSharing ? "(Screen)" : ""}
            </div>
            <button
              onClick={toggleUserFullScreen}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              {userFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
          <div
            ref={techVideoContainerRef}
            className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video"
          >
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className={`w-full h-full object-cover ${
                !remoteStream ? "hidden" : ""
              }`}
            />
            {(!remoteStream || connectionState !== "Connected") && (
              <div className="w-full h-full flex items-center justify-center text-white">
                {connectionState}
              </div>
            )}
            {isConnected && remoteStream && (
              <>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
                  Technician {technician}
                </div>
                <button
                  onClick={toggleTechFullScreen}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  {techFullScreen ? (
                    <Minimize size={16} />
                  ) : (
                    <Maximize size={16} />
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={toggleMute}
            className={`p-4 rounded-full ${
              isMuted ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full ${
              isVideoOff ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
          </button>
          <button
            onClick={toggleScreenShare}
            className={`p-4 rounded-full ${
              isScreenSharing
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <Monitor size={20} />
          </button>
          <button
            onClick={endCall}
            className="p-4 rounded-full bg-red-500 text-white"
          >
            <Phone size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
