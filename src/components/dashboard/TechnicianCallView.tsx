import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { X, Mic, MicOff, Video, VideoOff, Monitor, Phone, Maximize, Minimize } from 'lucide-react';

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
  onEndCall 
}) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOff, setIsVideoOff] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [userFullScreen, setUserFullScreen] = useState<boolean>(false);
  const [techFullScreen, setTechFullScreen] = useState<boolean>(false);
  const [connectionEstablished, setConnectionEstablished] = useState<boolean>(false);
  
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
      localStream?.getTracks().forEach(track => track.stop());
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
      
      peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate))
        .catch(e => console.error('Error adding ice candidate:', e));
    });
    
    socket.on('answer', async ({ answer }) => {
      console.log('Received answer from user');
      if (!peerConnection.current) return;
      
      try {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
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
    if (localStream && socket && peerConnection.current && !connectionEstablished) {
      socket.emit('acceptSupport', { 
        userId: user.userId, 
        technicianId, 
        technicianName 
      });
      
      setTimeout(() => {
        createAndSendOffer();
      }, 1000);
    }
  }, [localStream, socket, user.userId, technicianId, technicianName, connectionEstablished]);

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
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ],
      sdpSemantics: 'unified-plan'
    };
  
    const pc = new RTCPeerConnection(configuration);
    peerConnection.current = pc;
  
    pc.addTransceiver('audio', {
      direction: 'sendrecv'
    });
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('Sending ICE candidate to user');
        socket?.emit('iceCandidate', { 
          to: user.userId, 
          candidate: event.candidate 
        });
      }
    };

    pc.onconnectionstatechange = () => {
      console.log('Connection state:', pc.connectionState);
      
      if (pc.connectionState === 'connected') {
        console.log('WebRTC connection established successfully!');
        setConnectionEstablished(true);
      }
    };

    pc.ontrack = (event) => {
      console.log("Received remote track");
      
      if (remoteVideoRef.current && event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
        setRemoteStream(event.streams[0]);
      }
    };
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
          console.log(`Adding track ${index + 1}/${tracks.length}: ${track.kind}`);
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
        offerToReceiveVideo: true
      });
      console.log('Offer created:', JSON.stringify(offer).substring(0, 100) + '...');
      
      console.log('Setting local description...');
      await peerConnection.current.setLocalDescription(offer);
 
      socket.emit('offer', {
        to: user.userId,
        offer: peerConnection.current.localDescription
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
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        if (peerConnection.current && stream) {
          const senders = peerConnection.current.getSenders();
          const videoTrack = stream.getVideoTracks()[0];
          
          const videoSender = senders.find(sender => 
            sender.track?.kind === 'video'
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
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        if (peerConnection.current && stream) {
          const senders = peerConnection.current.getSenders();
          const videoTrack = stream.getVideoTracks()[0];
          
          const videoSender = senders.find(sender => 
            sender.track?.kind === 'video'
          );
          
          if (videoSender && videoTrack) {
            videoSender.replaceTrack(videoTrack);
          }
        }

        stream.getVideoTracks()[0].onended = async () => {
          await toggleScreenShare();
        };

        setLocalStream(prev => {

          if (prev) {
            prev.getAudioTracks().forEach(track => {
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


  const endCall = () => {
    socket?.emit('endSupport', { userId: user.userId });
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    localStream?.getTracks().forEach(track => track.stop());
    onEndCall();
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Support Session with {user.username}</h2>
        <button 
          onClick={endCall} 
          className="p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          ref={techVideoContainerRef}
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
            You {isScreenSharing ? '(Screen)' : ''}
          </div>
          <button 
            onClick={toggleTechFullScreen}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            {techFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>

        <div 
          ref={userVideoContainerRef}
          className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video"
        >
          <video 
            ref={remoteVideoRef} 
            autoPlay 
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
            {user.username}
          </div>
          <button 
            onClick={toggleUserFullScreen}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            {userFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button 
          onClick={toggleMute}
          className={`p-4 rounded-full ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
        <button 
          onClick={toggleVideo}
          className={`p-4 rounded-full ${isVideoOff ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>
        <button 
          onClick={toggleScreenShare}
          className={`p-4 rounded-full ${isScreenSharing ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
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
      
      {!connectionEstablished && (
        <div className="mt-4 text-center text-gray-600">
          Establishing connection with {user.username}...
        </div>
      )}
    </div>
  );
};

export default TechnicianCallView;