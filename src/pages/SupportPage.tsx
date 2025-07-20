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
import RatingModal from "../components/clients/RatingModal";

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
  const [isRateModalOpen, openRateModal] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
      socket.emit("requestSupport", { userId: userId.current, username });
    });

    socket.on("supportAccepted", ({ technicianId, technicianName }) => {
      setTechnician(technicianName);
      setTechnicianId(technicianId);
      setIsConnected(true);
      setConnectionState("Establishing connection...");
      createPeerConnection(technicianId);
    });

    socket.on("iceCandidate", ({ candidate }) => {
      if (!peerConnection.current || !candidate) return;

      peerConnection.current
        .addIceCandidate(new RTCIceCandidate(candidate))
        .then(() => {
        })
        .catch((e) => console.error("Error adding ice candidate:", e));
    });

    socket.on("offer", async ({ offer }) => {

      try {
        if (!peerConnection.current) {
          console.error("No peer connection exists when offer received");
          return;
        }
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(offer)
        );
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit("answer", {
          to: technicianId,
          answer,
        });
      } catch (error) {
      }
    });

    socket.on("supportEnded", () => {
      terminateCall();
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
        {
          urls: [
            "stun:68.183.102.224:3478",
            "turn:68.183.102.224:3478?transport=udp"
          ],
          username: "webrtcdo",
          credential: "webrtc1pass2"
        }
      ],      
      iceCandidatePoolSize: 10,
      sdpSemantics: 'unified-plan',
    };

    try {
      const pc = new RTCPeerConnection(configuration);
      peerConnection.current = pc;

      // Set up connection timeout
      const connectionTimeout = setTimeout(() => {
        if (
          pc.iceConnectionState !== "connected" &&
          pc.iceConnectionState !== "completed"
        ) {
          console.log(
            "Connection timeout - consider using different ICE servers or restart"
          );
          setConnectionState("Connection timeout");
        }
      }, 200000);
      pc.oniceconnectionstatechange = () => {

        if (
          pc.iceConnectionState === "connected" ||
          pc.iceConnectionState === "completed"
        ) {
          clearTimeout(connectionTimeout);
        } else if (pc.iceConnectionState === "failed") {
          console.log("ICE connection failed, attempting to restart ICE");
          try {
            pc.restartIce();
          } catch (error) {
            console.error("Error during ICE restart:", error);
          }
        } else if (pc.iceConnectionState === "disconnected") {
          console.log("ICE connection disconnected, monitoring for recovery");
          setTimeout(() => {
            if (pc.iceConnectionState === "disconnected") {
              console.log(
                "ICE connection still disconnected, attempting restart"
              );
              try {
                pc.restartIce();
              } catch (error) {
                console.error("Error during ICE restart:", error);
              }
            }
          }, 5000);
        }
      };

      pc.onicegatheringstatechange = () => {
        console.log("ICE gathering state:", pc.iceGatheringState);

        if (
          pc.iceGatheringState === "complete" &&
          pc.iceConnectionState !== "connected" &&
          pc.iceConnectionState !== "completed"
        ) {
          console.log(
            "Gathered all candidates but not connected - may indicate NAT/firewall issues"
          );
        }
      };

      pc.onsignalingstatechange = () => {
        console.log("Signaling state:", pc.signalingState);

        if (pc.signalingState === "closed") {
          console.log("Signaling state closed");
        }
      };

      if (localStream) {
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
        });
      }

      pc.onicecandidate = (event) => {
        if (event.candidate) {
            socket?.emit("iceCandidate", {
            to: techId,
            candidate: event.candidate,
          });
        } else {
          console.log("End of ICE candidates gathering");
        }
      };

      pc.ontrack = (event) => {

        if (remoteVideoRef.current && event.streams[0]) {
          console.log("Setting remote stream to video element");
          remoteVideoRef.current.srcObject = event.streams[0];
          setRemoteStream(event.streams[0]);
        }
      };

      if (pc.getStats) {
        // Periodically collect connection stats
        const statsInterval = setInterval(async () => {
          if (pc.connectionState === "connected") {
            try {
              const stats = await pc.getStats();
              let hasActiveCandidate = false;

              stats.forEach((report) => {
                if (
                  report.type === "candidate-pair" &&
                  report.state === "succeeded"
                ) {
                  hasActiveCandidate = true;
                }
              });

              if (!hasActiveCandidate && pc.connectionState === "connected") {
                console.log(
                  "Connected but no active candidate pair found - possible issue"
                );
              }
            } catch (error) {
              console.error("Error getting stats:", error);
            }
          }
        }, 10000); 
        pc.onconnectionstatechange = () => {
          console.log("Connection state changed:", pc.connectionState);
          setConnectionState(pc.connectionState);
        
          if (pc.connectionState === "connected") {
            setConnectionState("Connected");
            clearTimeout(connectionTimeout);
          } else if (
            pc.connectionState === "failed" ||
            pc.connectionState === "disconnected" ||
            pc.connectionState === "closed"
          ) {
            setConnectionState("Connection failed or closed");
            console.log("Connection failed or closed, may need to reconnect");
            clearInterval(statsInterval); // <- add this here
          }
        };
        
      }

      return pc;
    } catch (error) {
      setConnectionState("Error creating connection");
      return null;
    }
  };

  const stopAllMediaTracks = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const streams = localVideoRef.current.srcObject;
      if (streams instanceof MediaStream) {
        streams.getTracks().forEach((track) => {
          track.stop();
        });
      }
    }
    if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
      const streams = remoteVideoRef.current.srcObject;
      if (streams instanceof MediaStream) {
        streams.getTracks().forEach((track) => {
          track.stop();
        });
      }
    }

    // Clear video sources
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
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

  const terminateCall = () => {
    socket?.emit("endSupport", { userId: userId.current });
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    localStream?.getTracks().forEach((track) => track.stop());
    setIsConnected(false);
    stopAllMediaTracks();
    openRateModal(true);
  };

  const endCall = () => {
    if(audioRef.current){
      audioRef.current.volume = 0.0;
    }
    const isConfirmed = window.confirm(
      "Are you sure you want to end this support call?"
    );

    if (isConfirmed) {
      if (isConnected) {
        alert("Dear user, talk to technician to end support session .");
      } else {
        socket?.emit("cancelRequest", { userId: userId.current });
        terminateCall();
      }
    }
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

  const handleCloseRatingModal = () => {
    navigate("/");
  };


useEffect(() => {
  if (!isConnected) {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/phone-dialing-1.mp3');
      audioRef.current.volume = 0.4;
    }

    const audio = audioRef.current;

    const playLoop = () => {
      audio.currentTime = 0;
      audio.play().catch(err => console.error('Failed to play notification sound:', err));
    };

    audio.addEventListener('ended', playLoop);
    playLoop();

    return () => {
      audio.pause();
      audio.removeEventListener('ended', playLoop);
    };
  } else {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }
}, [isConnected]);

const tryReconnect = async () => {
  console.log("Attempting to reconnect...");
  
  if (peerConnection.current) {
    peerConnection.current.close();
    peerConnection.current = null;
  }

  const newPc = createPeerConnection(technicianId);
  
  if (!newPc) {
    console.error("Failed to create new peer connection.");
    return;
  }

  peerConnection.current = newPc;

  try {
    const offer = await newPc.createOffer();
    await newPc.setLocalDescription(offer);
    socket?.emit("offer", { to: technicianId, offer });
    setConnectionState("reconnecting");
  } catch (err) {
    console.error("Reconnect failed:", err);
  }
};

useEffect(() => {
  if (!socket) return;

  const handleNetworkLost = () => {
    setConnectionState("Reconnecting");
  };

  socket.on('network-lost', handleNetworkLost);

  return () => {
    socket.off('network-lost', handleNetworkLost); // cleanup
  };
}, [socket]);


useEffect(() => {
  const handleOffline = () => {
    console.log("You are offline");
    setConnectionState("offline");
    socket?.emit("network-lost", { to: technicianId });
  };

  const handleOnline = () => {
    console.log("Back online");
    setConnectionState("reconnecting");
    tryReconnect(); // Function you'll define
  };

  window.addEventListener("offline", handleOffline);
  window.addEventListener("online", handleOnline);

  return () => {
    window.removeEventListener("offline", handleOffline);
    window.removeEventListener("online", handleOnline);
  };
}, []);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 w-full max-w-6xl max-h-screen overflow-auto">
        <div className="flex justify-between items-center mb-3 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
            Support Session
          </h2>
          <button
            onClick={endCall}
            className="p-1 sm:p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200"
          >
            <X size={16} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        <div
          className={`grid grid-cols-1 ${
            !userFullScreen && !techFullScreen ? "md:grid-cols-2" : ""
          } gap-3 sm:gap-6`}
        >
          <div
            ref={userVideoContainerRef}
            className={`relative bg-gray-800 rounded-lg overflow-hidden aspect-video ${
              userFullScreen ? "col-span-full" : ""
            } ${techFullScreen ? "hidden" : ""}`}
          >
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full ${
                userFullScreen ? "object-contain" : "object-cover"
              }`}
            />
            <div
              className={`absolute ${
                userFullScreen
                  ? "top-2 left-1/2 -translate-x-1/2"
                  : "bottom-2 sm:bottom-4 left-2 sm:left-4"
              } bg-black bg-opacity-50 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm`}
            >
              You {isScreenSharing ? "(Screen)" : ""}
            </div>
            {!isScreenSharing && (
              <button
                onClick={toggleUserFullScreen}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full"
              >
                {userFullScreen ? (
                  <Minimize size={14} className="sm:w-4 sm:h-4" />
                ) : (
                  <Maximize size={14} className="sm:w-4 sm:h-4" />
                )}
              </button>
            )}
          </div>
          <div
            ref={techVideoContainerRef}
            className={`relative bg-gray-800 rounded-lg overflow-hidden aspect-video ${
              techFullScreen ? "col-span-full" : ""
            } ${userFullScreen ? "hidden" : ""}`}
          >
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className={`w-full h-full ${
                techFullScreen ? "object-contain" : "object-cover"
              } ${!remoteStream ? "hidden" : ""}`}
            />
            {(!remoteStream || connectionState !== "Connected") && (
              <div className="w-full h-full flex items-center justify-center text-white text-sm sm:text-base">
                {connectionState}
              </div>
            )}
            {isConnected && remoteStream && (
              <>
                <div
                  className={`absolute ${
                    techFullScreen
                      ? "top-2 left-1/2 -translate-x-1/2"
                      : "bottom-2 sm:bottom-4 left-2 sm:left-4"
                  } bg-black bg-opacity-50 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm`}
                >
                  Technician {technician}
                </div>
                <button
                  onClick={toggleTechFullScreen}
                  className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full"
                >
                  {techFullScreen ? (
                    <Minimize size={14} className="sm:w-4 sm:h-4" />
                  ) : (
                    <Maximize size={14} className="sm:w-4 sm:h-4" />
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-3 sm:mt-6 space-x-2 sm:space-x-4">
          <button
            onClick={toggleMute}
            className={`p-3 sm:p-4 rounded-full ${
              isMuted ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {isMuted ? (
              <MicOff size={16} className="sm:w-5 sm:h-5" />
            ) : (
              <Mic size={16} className="sm:w-5 sm:h-5" />
            )}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-3 sm:p-4 rounded-full ${
              isVideoOff ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {isVideoOff ? (
              <VideoOff size={16} className="sm:w-5 sm:h-5" />
            ) : (
              <Video size={16} className="sm:w-5 sm:h-5" />
            )}
          </button>
          <button
            onClick={toggleScreenShare}
            className={`p-3 sm:p-4 rounded-full ${
              isScreenSharing
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <Monitor size={16} className="sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={endCall}
            className="p-3 sm:p-4 rounded-full bg-red-500 text-white"
          >
            <Phone size={16} className="sm:w-5 sm:h-5" />
          </button>
          {connectionState !== "connected" && (
  <button onClick={tryReconnect} className="bg-blue-500 text-white p-2 rounded">
    Reconnect
  </button>
)}

        </div>
      </div>
      <RatingModal
        isOpen={isRateModalOpen}
        onClose={handleCloseRatingModal}
        onSubmit={handleCloseRatingModal}
        onAskLater={handleCloseRatingModal}
      />
    </div>
  );
};

export default SupportPage;
