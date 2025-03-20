import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import {
  BsMicFill,
  BsMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsDisplayFill,
  BsXCircleFill,
} from "react-icons/bs";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

// Make sure to use your correct backend URL
const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

const SupportPage: React.FC = () => {
  const [callStatus, setCallStatus] = useState<
    "waiting" | "connected" | "ended"
  >("waiting");
  const [adminId, setAdminId] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  // Media controls
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  // Fullscreen controls
  const [localFullScreen, setLocalFullScreen] = useState(false);
  const [remoteFullScreen, setRemoteFullScreen] = useState(false);

  // WebRTC state
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const navigate = useNavigate();
  const clientId = useRef<string>(crypto.randomUUID());

  useEffect(() => {
    // Connect to socket server
    socketRef.current = io(SOCKET_URL);
    const socket = socketRef.current;
    socket.on("connect", () => {
      // Register as a client looking for support
      socket.emit("requestSupport", {
        userId: clientId.current,
        issue: "Tech Support",
      });
      socket.emit("register", { userId: clientId.current, userType: "user" });
      // Listen for the offer from the admin
      
      socket.on("receiveOffer", async (data) => {
        console.log("Received offer:", data.offer);

        // Initialize Peer Connection
        const configuration = {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
          ],
        };
        const pc = new RTCPeerConnection(configuration);

        // Store PeerConnection
        peerConnectionRef.current = pc;

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("sendIceCandidate", {
              receiverId: data.senderId, // Admin's ID
              candidate: event.candidate,
            });
          }
        };

        // Handle remote track (video/audio from admin)
        pc.ontrack = (event) => {
          if (remoteVideoRef.current && event.streams[0]) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        try {
          // Set remote description with the received offer
          await pc.setRemoteDescription(new RTCSessionDescription(data.offer));

          // Get local media stream
          const localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
        //   localStreamRef.current = localStream;

          // Add local tracks to the peer connection
          localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
          });

          // Create and send answer
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);

          // Emit answer back to the admin
          socket.emit("sendAnswer", {
            receiverId: data.senderId, // Admin's socket ID
            answer,
          });

          console.log("Answer sent");
        } catch (error) {
          console.error("Error handling offer:", error);
        }
      });
        socket.off("receiveOffer"); // Clean up listener


      socket.on("call-ended", () => {
        if (socket) {
            socket.emit('endCall', {
              userId: adminId,
              message:"Call ended"
            });
            setCallStatus("ended");
            cleanupCall();
        }
      });

      return () => {
        // Cleanup on component unmount
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
        cleanupCall();
      };
    });
  }, [clientId]);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error("Error accessing camera or microphone:", error);
      }
    };

    startVideo();
  }, []);

  const createPeerConnection = (targetAdminId: string) => {
    try {
      // Configure ICE servers (STUN/TURN)
      const configuration: RTCConfiguration = {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" }, // Free public STUN server
          // Add TURN servers if needed for production
        ],
      };

      const peerConnection = new RTCPeerConnection(configuration);
      peerConnectionRef.current = peerConnection;

      // Add local stream tracks to peer connection
      if (stream) {
        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, stream);
        });
      }

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.emit("ice-candidate", {
            candidate: event.candidate,
            targetId: targetAdminId,
          });
        }
      };

      // Listen for remote stream
      peerConnection.ontrack = (event) => {
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Create and send an offer if we're initiating the call
      createAndSendOffer(targetAdminId);
    } catch (error) {
      console.error("Error creating peer connection:", error);
    }
  };

  const createAndSendOffer = async (targetAdminId: string) => {
    try {
      if (peerConnectionRef.current && socketRef.current) {
        const offer = await peerConnectionRef.current.createOffer();
        await peerConnectionRef.current.setLocalDescription(offer);

        socketRef.current.emit("offer", {
          offer,
          targetId: targetAdminId,
          clientId: clientId.current,
        });
      }
    } catch (error) {
      console.error("Error creating or sending offer:", error);
    }
  };

  const handleOffer = async (
    offer: RTCSessionDescriptionInit,
    adminId: string
  ) => {
    try {
      if (!peerConnectionRef.current) {
        createPeerConnection(adminId);
      }

      await peerConnectionRef.current?.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnectionRef.current?.createAnswer();
      await peerConnectionRef.current?.setLocalDescription(answer);

      if (socketRef.current && answer) {
        socketRef.current.emit("answer", {
          answer,
          targetId: adminId,
          clientId: clientId.current,
        });
      }
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  };

  const cleanupCall = () => {
    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Clean up media streams
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
    }

    // Reset UI states
    setMicActive(false);
    setCameraActive(false);
    setScreenSharing(false);

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
  };

  const toggleMicrophone = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled; // Toggle mic
        setMicActive(audioTrack.enabled);
      }
    }
  };

  const toggleCamera = async () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];

      if (videoTrack) {
        if (videoTrack.readyState === "live") {
          // Stop the video track and disable the camera
          videoTrack.stop();
          setCameraActive(false);

          // Clear the video stream from the video element
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
          }
        } else {
          try {
            // Request a new video stream to turn the camera back on
            const newStream = await navigator.mediaDevices.getUserMedia({
              video: true,
            });

            // Retrieve the new video track
            const newVideoTrack = newStream.getVideoTracks()[0];

            // Stop the existing track in the old stream, if any
            stream
              .getVideoTracks()
              .forEach((track) => stream.removeTrack(track));

            // Add the new video track to the existing stream
            stream.addTrack(newVideoTrack);

            // Bind the updated stream to the video element
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
            }

            setCameraActive(true);

            // Update the peer connection with the new track
            if (peerConnectionRef.current && adminId) {
              const sender = peerConnectionRef.current
                .getSenders()
                .find((s) => s.track?.kind === "video");

              if (sender) {
                sender.replaceTrack(newVideoTrack);
              } else {
                peerConnectionRef.current.addTrack(newVideoTrack, stream);
              }
            }
          } catch (error) {
            console.error("Error re-enabling camera and video:", error);
          }
        }
      } else {
        console.error("No video track found to toggle.");
      }
    } else {
      console.error("No active stream available to toggle the camera.");
    }
  };

  const toggleScreenShare = async () => {
    if (!screenSharing) {
      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        screenStreamRef.current = displayStream;

        // Replace the current video track with the screen-sharing track
        const videoTrack = displayStream.getVideoTracks()[0];

        // Update the peer connection with the screen sharing track
        if (peerConnectionRef.current) {
          const sender = peerConnectionRef.current
            .getSenders()
            .find((s) => s.track?.kind === "video");

          if (sender) {
            sender.replaceTrack(videoTrack);
          }
        }

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = displayStream;
        }

        videoTrack.onended = () => {
          toggleScreenShare(); // Automatically stop screen sharing when user ends it
        };

        setScreenSharing(true);
      } catch (error) {
        console.error("Error starting screen sharing:", error);
      }
    } else {
      // Stop screen sharing
      if (screenStreamRef.current) {
        const tracks = screenStreamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }

      // Switch back to camera
      try {
        if (stream) {
          // Get a new video track from the camera
          const originalStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          const newVideoTrack = originalStream.getVideoTracks()[0];

          // Update the peer connection
          if (peerConnectionRef.current) {
            const sender = peerConnectionRef.current
              .getSenders()
              .find((s) => s.track?.kind === "video");

            if (sender) {
              sender.replaceTrack(newVideoTrack);
            }
          }

          // Update the local video
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = originalStream;
          }

          // Update the stream reference
          stream.getVideoTracks().forEach((track) => track.stop());
          stream.addTrack(newVideoTrack);
        }
      } catch (error) {
        console.error("Error switching back to camera:", error);
      }

      setScreenSharing(false);
    }
  };

  // Toggle fullscreen for local video
  const toggleLocalFullScreen = () => {
    setLocalFullScreen(!localFullScreen);
    setRemoteFullScreen(false);
  };

  // Toggle fullscreen for remote video
  const toggleRemoteFullScreen = () => {
    setRemoteFullScreen(!remoteFullScreen);
    setLocalFullScreen(false);
  };

  const endCall = () => {
    // Notify admin that call is ending
    if (socketRef.current && adminId) {
      socketRef.current.emit("end-call", {
        targetId: adminId,
        clientId: clientId.current,
      });
    }

    cleanupCall();
    setCallStatus("ended");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}

      {/* Main content */}
      <div className="flex-1 p-4 flex flex-col lg:flex-row gap-4 overflow-hidden">
        {/* Video containers */}
        <div
          className={`relative ${
            remoteFullScreen
              ? "w-full h-full"
              : localFullScreen
              ? "hidden"
              : "lg:w-2/3 w-full h-64 lg:h-auto"
          }`}
        >
          {callStatus === "waiting" ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-lg">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-lg font-medium">Please wait</p>
                <p className="text-sm">
                  A support agent will be with you shortly
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden relative">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={toggleRemoteFullScreen}
                  className="bg-gray-800 bg-opacity-70 text-white p-2 rounded-full"
                >
                  {remoteFullScreen ? (
                    <MdFullscreenExit size={20} />
                  ) : (
                    <MdFullscreen size={20} />
                  )}
                </button>
              </div>
              <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                Support Agent {adminId ? `(${adminId})` : ""}
              </div>
            </div>
          )}
        </div>

        <div
          className={`relative ${
            localFullScreen
              ? "w-full h-full"
              : remoteFullScreen
              ? "hidden"
              : "lg:w-1/3 w-full h-48 lg:h-auto"
          }`}
        >
          <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden relative">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted // Always mute local video to prevent echo
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={toggleLocalFullScreen}
                className="bg-gray-800 bg-opacity-70 text-white p-2 rounded-full"
              >
                {localFullScreen ? (
                  <MdFullscreenExit size={20} />
                ) : (
                  <MdFullscreen size={20} />
                )}
              </button>
            </div>
            <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
              You {screenSharing ? "(Screen Sharing)" : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-primary p-4">
        <div className="flex justify-center gap-4">
          <button
            onClick={toggleMicrophone}
            className={`p-3 rounded-full ${
              micActive ? "bg-blue-500" : "bg-red-500"
            }`}
          >
            {micActive ? (
              <BsMicFill size={24} color="white" />
            ) : (
              <BsMicMuteFill size={24} color="white" />
            )}
          </button>

          <button
            onClick={toggleCamera}
            className={`p-3 rounded-full ${
              cameraActive ? "bg-blue-500" : "bg-red-500"
            }`}
          >
            {cameraActive ? (
              <BsCameraVideoFill size={24} color="white" />
            ) : (
              <BsCameraVideoOffFill size={24} color="white" />
            )}
          </button>

          <button
            onClick={toggleScreenShare}
            className={`p-3 rounded-full ${
              screenSharing ? "bg-blue-500" : "bg-red-500"
            }`}
          >
            <BsDisplayFill size={24} color="white" />
          </button>

          <button onClick={endCall} className="p-3 rounded-full bg-red-600">
            <BsXCircleFill size={24} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
