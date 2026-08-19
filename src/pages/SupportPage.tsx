import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import RatingModal from "../components/clients/RatingModal";
import socket from "../utils/socket";

const SupportPage: React.FC<any> = () => {
  const navigate = useNavigate();
  const userId = useRef<string>(crypto.randomUUID());
  const username = "Need-for-support";
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
  const { techId } = useParams<{ techId: string }>();
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<any | null>(null);

  useEffect(() => {
    if (connectionState=="connected") {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setSeconds(0);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [connectionState]);

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((secs % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };
  useEffect(() => {
    initializeMedia();
    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
    };
  }, []);

  useEffect(() => {
    socket.connect();
    if (!socket) return;
    if (!techId) {
      socket.emit("requestSupport", { userId: userId.current, username });
    } else {
      socket.emit("requestSupport", {
        userId: userId.current,
        username: "Specific Support",
        techId,
      });
    }
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
        .then(() => {})
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
      } catch (error) {}
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
  }, [socket, technicianId]);

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
  { urls: "stun:stun.l.google.com:19302" },
  {
    urls: "turn:204.168.178.194:3478",
    username: "axxetawbrtc",
    credential: "axxetta00pswdw0c11",
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
            setConnectionState("connected");
            clearTimeout(connectionTimeout);
          } else if (
            pc.connectionState === "failed" ||
            pc.connectionState === "disconnected" ||
            pc.connectionState === "closed"
          ) {
            setConnectionState("Connection failed or closed");
            console.log("Connection failed or closed, may need to reconnect");
        
            // cleanup stats interval
            if (pc.connectionState === "closed" || pc.connectionState === "failed") {
              clearInterval(statsInterval);
            }
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
    if (audioRef.current) {
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
    if (connectionState == "Waiting for support...") {
      if (!audioRef.current) {
        audioRef.current = new Audio("/audio/phone-dialing-1.mp3");
        audioRef.current.volume = 0.4;
      }

      const audio = audioRef.current;

      const playLoop = () => {
        audio.currentTime = 0;
        audio
          .play()
          .catch((err) =>
            console.error("Failed to play notification sound:", err)
          );
      };

      audio.addEventListener("ended", playLoop);
      playLoop();

      return () => {
        audio.pause();
        audio.removeEventListener("ended", playLoop);
      };
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isConnected]);
  
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black z-50 flex flex-col">
      <div className="flex flex-col w-full h-full bg-black">
        <header className="flex justify-between items-center px-4 py-3 bg-black/80 backdrop-blur border-b border-white/10 text-white">
          <div className="flex items-center space-x-4">
            <h2 className="text-sm font-semibold tracking-tight">Support session</h2>
            {isConnected && remoteStream && (
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium tabular-nums">
                {formatTime(seconds)}
              </span>
            )}
            {!isConnected && (
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium">
                {connectionState}
              </span>
            )}
          </div>
          <button
            onClick={endCall}
            className="p-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </header>

        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 p-0">
          <div
            ref={userVideoContainerRef}
            className={`relative bg-black overflow-hidden ${
              userFullScreen ? "col-span-full" : ""
            } ${techFullScreen ? "hidden" : ""}`}
          >
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full object-cover`}
            />
            <div
              className={`absolute ${
                userFullScreen
                  ? "top-4 left-1/2 -translate-x-1/2"
                  : "bottom-3 sm:bottom-4 left-3 sm:left-4"
              } bg-black/60 backdrop-blur text-white px-2.5 py-1 rounded-full text-xs`}
            >
              You {isScreenSharing ? "(Screen)" : ""}
            </div>
            {!isScreenSharing && (
              <button
                onClick={toggleUserFullScreen}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/60 backdrop-blur text-white p-2 rounded-lg hover:bg-black/80 transition-colors"
              >
                {userFullScreen ? (
                  <Minimize size={16} className="sm:w-5 sm:h-5" />
                ) : (
                  <Maximize size={16} className="sm:w-5 sm:h-5" />
                )}
              </button>
            )}
          </div>

          <div
            ref={techVideoContainerRef}
            className={`relative bg-black overflow-hidden ${
              techFullScreen ? "col-span-full" : ""
            } ${userFullScreen ? "hidden" : ""}`}
          >
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className={`w-full h-full object-cover ${!remoteStream ? "hidden" : ""}`}
            />
            {(!remoteStream || connectionState !== "Connected") && (
              <div className="w-full h-full flex items-center justify-center text-sm text-white/60">
                {connectionState}
              </div>
            )}
            {isConnected && remoteStream && (
              <>
                <div
                  className={`absolute ${
                    techFullScreen
                      ? "top-4 left-1/2 -translate-x-1/2"
                      : "bottom-3 sm:bottom-4 left-3 sm:left-4"
                  } bg-black/60 backdrop-blur text-white px-2.5 py-1 rounded-full text-xs`}
                >
                  Technician {technician}
                </div>
                <button
                  onClick={toggleTechFullScreen}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/60 backdrop-blur text-white p-2 rounded-lg hover:bg-black/80 transition-colors"
                >
                  {techFullScreen ? (
                    <Minimize size={16} className="sm:w-5 sm:h-5" />
                  ) : (
                    <Maximize size={16} className="sm:w-5 sm:h-5" />
                  )}
                </button>
              </>
            )}
          </div>
        </main>

        <footer className="px-4 py-4 bg-black/80 backdrop-blur border-t border-white/10 flex justify-center gap-3">
          <button
            onClick={toggleMute}
            className={`p-3 rounded-full transition-colors ${
              isMuted
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white/10 text-white hover:bg-white/20"
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
            className={`p-3 rounded-full transition-colors ${
              isVideoOff
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white/10 text-white hover:bg-white/20"
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
            className={`p-3 rounded-full transition-colors ${
              isScreenSharing
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <Monitor size={16} className="sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={endCall}
            className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <Phone size={16} className="sm:w-5 sm:h-5" />
          </button>
        </footer>
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
