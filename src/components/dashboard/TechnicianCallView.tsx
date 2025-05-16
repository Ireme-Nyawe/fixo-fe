import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
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
} from 'lucide-react';
import { FaPlus } from 'react-icons/fa';
import RequestPayment from '../technician/payments/RequestPayment';

interface User {
  userId: string;
  username: string;
}

interface TechnicianCallViewProps {
  socket: Socket | null;
  user: User;
  technicianId: string;
  technicianName: string;
  onEndCall: () => void;
}

const TechnicianCallView: React.FC<TechnicianCallViewProps> = ({
  socket,
  user,
  technicianId,
  technicianName,
  onEndCall,
}) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [userFullScreen, setUserFullScreen] = useState<boolean>(false);
  const [techFullScreen, setTechFullScreen] = useState<boolean>(false);
  const [connectionEstablished, setConnectionEstablished] =
    useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const userVideoContainerRef = useRef<HTMLDivElement>(null);
  const techVideoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize user media
    initializeMedia();

    // Clean up on component unmount
    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('iceCandidate', ({ candidate }) => {
      console.log('Received ICE candidate from user');
      if (!peerConnection.current || !candidate) return;

      peerConnection.current
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch((e) => console.error('Error adding ice candidate:', e));
    });

    socket.on('answer', async ({ answer }) => {
      console.log('Received answer from user');
      if (!peerConnection.current) return;

      try {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
        console.log('Remote description set successfully');
        setConnectionEstablished(true);
      } catch (error) {
        console.error('Error setting remote description:', error);
      }
    });

    return () => {
      socket.off('iceCandidate');
      socket.off('answer');
    };
  }, [socket]);

  useEffect(() => {
    if (
      localStream &&
      socket &&
      peerConnection.current &&
      !connectionEstablished
    ) {
      socket.emit('acceptSupport', {
        userId: user.userId,
        technicianId,
        technicianName,
      });

      setTimeout(() => {
        createAndSendOffer();
      }, 1000);
    }
  }, [
    localStream,
    socket,
    user.userId,
    technicianId,
    technicianName,
    connectionEstablished,
  ]);

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

      createPeerConnection();
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const createPeerConnection = () => {
    console.log('Creating technician-side peer connection');

    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
          urls: "turn:77.220.212.11",
          username: "webrtcuser",
          credential: "password123",
        },
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
          pc.iceConnectionState !== 'connected' &&
          pc.iceConnectionState !== 'completed'
        ) {
          console.log(
            'Connection timeout - consider using different ICE servers or restart'
          );
        }
      }, 20000); // 20 seconds timeout

      // Add audio transceiver
      pc.addTransceiver('audio', {
        direction: 'sendrecv',
      });

      // Add video transceiver if needed
      pc.addTransceiver('video', {
        direction: 'sendrecv',
      });

      pc.onconnectionstatechange = () => {
        console.log('Connection state:', pc.connectionState);

        if (pc.connectionState === 'connected') {
          console.log('WebRTC connection established successfully!');
          setConnectionEstablished(true);
          clearTimeout(connectionTimeout);
        } else if (
          pc.connectionState === 'failed' ||
          pc.connectionState === 'disconnected' ||
          pc.connectionState === 'closed'
        ) {
          console.log(
            `Connection ${pc.connectionState} - may need to reconnect`
          );
          setConnectionEstablished(false);
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log('ICE connection state:', pc.iceConnectionState);

        if (
          pc.iceConnectionState === 'connected' ||
          pc.iceConnectionState === 'completed'
        ) {
          clearTimeout(connectionTimeout);
        } else if (pc.iceConnectionState === 'failed') {
          console.log('ICE connection failed, attempting to restart ICE');
          try {
            pc.restartIce();
          } catch (error) {
            console.error('Error during ICE restart:', error);
          }
        } else if (pc.iceConnectionState === 'disconnected') {
          console.log('ICE connection disconnected, monitoring for recovery');
          // Start a timer to check if it recovers on its own
          setTimeout(() => {
            if (pc.iceConnectionState === 'disconnected') {
              console.log(
                'ICE connection still disconnected, attempting restart'
              );
              try {
                pc.restartIce();
              } catch (error) {
                console.error('Error during ICE restart:', error);
              }
            }
          }, 5000); // Wait 5 seconds before attempting restart
        }
      };

      pc.onicegatheringstatechange = () => {
        console.log('ICE gathering state:', pc.iceGatheringState);

        if (
          pc.iceGatheringState === 'complete' &&
          pc.iceConnectionState !== 'connected' &&
          pc.iceConnectionState !== 'completed'
        ) {
          console.log(
            'Gathered all candidates but not connected - may indicate NAT/firewall issues'
          );
        }
      };

      pc.onsignalingstatechange = () => {
        console.log('Signaling state:', pc.signalingState);
      };

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          const candidateInfo = event.candidate.candidate || 'unknown';
          const candidateType = event.candidate.type || 'unknown';
          console.log(`ICE candidate (${candidateType}): ${candidateInfo}`);

          socket?.emit('iceCandidate', {
            to: user.userId,
            candidate: event.candidate,
          });
        } else {
          console.log('End of ICE candidates gathering');
        }
      };

      pc.ontrack = (event) => {
        console.log('Received remote track:', event.track.kind);

        if (remoteVideoRef.current && event.streams[0]) {
          console.log('Setting remote stream to video element');
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Add local stream tracks if available
      if (localStream) {
        localStream.getTracks().forEach((track) => {
          console.log('Adding local track to peer connection:', track.kind);
          pc.addTrack(track, localStream);
        });
      }

      // Add stats collection for diagnostics (optional)
      if (pc.getStats) {
        // Periodically collect connection stats
        const statsInterval = setInterval(async () => {
          if (pc.connectionState === 'connected') {
            try {
              const stats = await pc.getStats();
              let hasActiveCandidate = false;

              stats.forEach((report) => {
                if (
                  report.type === 'candidate-pair' &&
                  report.state === 'succeeded'
                ) {
                  hasActiveCandidate = true;
                  console.log('Active candidate pair found');
                }
              });

              if (!hasActiveCandidate && pc.connectionState === 'connected') {
                console.log(
                  'Connected but no active candidate pair found - possible issue'
                );
              }
            } catch (error) {
              console.error('Error getting stats:', error);
            }
          }
        }, 10000); // Every 10 seconds

        // Clean up interval when connection closes
        pc.onconnectionstatechange = function () {
          if (
            pc.connectionState === 'closed' ||
            pc.connectionState === 'failed'
          ) {
            clearInterval(statsInterval);
          }
        };
      }

      return pc;
    } catch (error) {
      console.error('Error creating peer connection:', error);
      return null;
    }
  };

  // Helper function to close connection properly
  const closePeerConnection = () => {
    if (peerConnection.current) {
      // Close all tracks
      if (peerConnection.current.getSenders) {
        peerConnection.current.getSenders().forEach((sender) => {
          if (sender.track) {
            sender.track.stop();
          }
        });
      }

      // Close connection
      peerConnection.current.close();
      peerConnection.current = null;
      setConnectionEstablished(false);
      console.log('Peer connection closed properly');
    }
  };

  const createAndSendOffer = async () => {
    console.log('Starting createAndSendOffer');

    if (!peerConnection.current) {
      console.error('Cannot create offer: Peer connection is null');
      return;
    }

    if (!socket) {
      console.error('Cannot send offer: Socket is null');
      return;
    }

    try {
      console.log('Adding local tracks to peer connection');
      if (localStream) {
        const tracks = localStream.getTracks();
        console.log(`Adding ${tracks.length} tracks from local stream`);

        tracks.forEach((track, index) => {
          console.log(
            `Adding track ${index + 1}/${tracks.length}: ${track.kind}`
          );
          if (peerConnection.current) {
            peerConnection.current.addTrack(track, localStream);
          }
        });
      } else {
        console.warn('No local stream available when creating offer');
      }

      console.log('Creating offer...');
      const offer = await peerConnection.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      console.log(
        'Offer created:',
        JSON.stringify(offer).substring(0, 100) + '...'
      );

      console.log('Setting local description...');
      await peerConnection.current.setLocalDescription(offer);

      socket.emit('offer', {
        to: user.userId,
        offer: peerConnection.current.localDescription,
      });
      console.log('Offer sent to signaling server');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
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
            (sender) => sender.track?.kind === 'video'
          );

          if (videoSender && videoTrack) {
            videoSender.replaceTrack(videoTrack);
          }
        }

        setLocalStream(stream);
        setIsScreenSharing(false);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (!navigator.mediaDevices.getDisplayMedia) {
          alert("Screen sharing is not supported on this device, Try With Computer!");
        }
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        if (peerConnection.current && stream) {
          const senders = peerConnection.current.getSenders();
          const videoTrack = stream.getVideoTracks()[0];

          const videoSender = senders.find(
            (sender) => sender.track?.kind === 'video'
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
        console.error('Error sharing screen:', error);
      }
    }
  };


const terminateCall = () => {
  socket?.emit('endSupport', { userId: user.userId });
  if (peerConnection.current) {
    peerConnection.current.close();
    peerConnection.current = null;
  }
  localStream?.getTracks().forEach(track => track.stop());
  onEndCall();
  closePeerConnection();
};

const endCall = () => {
  const isConfirmed = window.confirm("Are you sure you want to end this support call?");
  
  if (isConfirmed) {
    terminateCall();
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

  const ControlButton: React.FC<{
    onClick: () => void;
    active?: boolean;
    activeColor: string;
    tooltip: string;
    children: React.ReactNode;
  }> = ({ onClick, active, activeColor, tooltip, children }) => (
    <button
      onClick={onClick}
      className={`p-6 rounded-full transition-all transform hover:scale-110 relative group ${
        active ? activeColor : 'bg-gray-100 hover:bg-gray-200'
      }`}
    >
      <span className={`${active ? 'text-white' : 'text-gray-700'}`}>
        {children}
      </span>
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
        {tooltip}
      </span>
    </button>
  );

  return (
    <>
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 break-words">
              Support Session with{' '}
              <span className="text-blue-600">{user.username}</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Session ID: {technicianId.slice(0, 8)}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-3 py-2 sm:px-4 md:px-6 md:py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg sm:rounded-xl transition-all flex items-center gap-2 sm:gap-3 shadow-lg hover:shadow-green-100 text-sm sm:text-base"
            >
              <FaPlus className="text-base sm:text-lg flex-shrink-0" />
              <span className="font-medium sm:font-semibold whitespace-nowrap">Request Payment</span>
            </button>

            <button
              onClick={endCall}
              className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all shadow-lg hover:shadow-red-100 group"
            >
              <X
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </button>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${!techFullScreen && !userFullScreen ? 'md:grid-cols-2' : ''} gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8`}>
          <div
            ref={techVideoContainerRef}
            className={`relative bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden aspect-video border-2 sm:border-4 border-gray-200 ${techFullScreen ? 'col-span-full' : ''} ${userFullScreen ? 'hidden' : ''}`}
          >
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full ${techFullScreen ? 'object-contain' : 'object-cover'} transform mirror`}
            />
            <div className={`absolute ${techFullScreen ? 'top-2 left-1/2 -translate-x-1/2' : 'bottom-2 sm:bottom-4 left-2 sm:left-4'} bg-gray-800 bg-opacity-80 text-gray-100 px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium`}>
              Your Camera {isScreenSharing && '(Sharing Screen)'}
            </div>
            <button
              onClick={toggleTechFullScreen}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gray-800 bg-opacity-80 text-white p-1 sm:p-2 rounded-md sm:rounded-lg hover:bg-gray-700 transition-colors"
            >
              {techFullScreen ? (
                <Minimize size={16} className="sm:w-5 sm:h-5" />
              ) : (
                <Maximize size={16} className="sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
          <div
            ref={userVideoContainerRef}
            className={`relative bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden aspect-video border-2 sm:border-4 border-gray-200 ${userFullScreen ? 'col-span-full' : ''} ${techFullScreen ? 'hidden' : ''}`}
          >
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className={`w-full h-full ${userFullScreen ? 'object-contain' : 'object-cover'}`}
            />
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-gray-800 bg-opacity-80 text-gray-100 px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium">
              {user.username}
            </div>
            <button
              onClick={toggleUserFullScreen}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gray-800 bg-opacity-80 text-white p-1 sm:p-2 rounded-md sm:rounded-lg hover:bg-gray-700 transition-colors"
            >
              {userFullScreen ? (
                <Minimize size={16} className="sm:w-5 sm:h-5" />
              ) : (
                <Maximize size={16} className="sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-3 sm:gap-6">
          <ControlButton
            onClick={toggleMute}
            active={isMuted}
            activeColor="bg-red-500"
            tooltip={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? 
              <MicOff size={18} className="sm:w-6 sm:h-6" /> : 
              <Mic size={18} className="sm:w-6 sm:h-6" />
            }
          </ControlButton>

          <ControlButton
            onClick={toggleVideo}
            active={isVideoOff}
            activeColor="bg-red-500"
            tooltip={isVideoOff ? 'Enable Camera' : 'Disable Camera'}
          >
            {isVideoOff ? 
              <VideoOff size={18} className="sm:w-6 sm:h-6" /> : 
              <Video size={18} className="sm:w-6 sm:h-6" />
            }
          </ControlButton>

          <ControlButton
            onClick={toggleScreenShare}
            active={isScreenSharing}
            activeColor="bg-blue-500"
            tooltip={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
          >
            <Monitor size={18} className="sm:w-6 sm:h-6" />
          </ControlButton>

          <button
            onClick={endCall}
            className="p-4 sm:p-6 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-xl transition-all transform hover:scale-110 relative group"
          >
            <Phone size={18} className="sm:w-6 sm:h-6 rotate-135" />
            <span className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-md sm:rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              End Call
            </span>
          </button>
        </div>

        {!connectionEstablished && (
          <div className="mt-4 sm:mt-8 text-center">
            <div className="inline-flex items-center bg-blue-50 px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-blue-600 text-sm sm:text-base">
              <svg
                className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Connecting to {user.username}...
            </div>
          </div>
        )}
      </div>
    </div>
    {showPaymentModal && (
      <RequestPayment onClose={() => setShowPaymentModal(false)} />
    )}
  </>
  );
};

export default TechnicianCallView;
