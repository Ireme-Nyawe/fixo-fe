import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface CallRequest {
  callerId: string;
  callId: string;
  issue?: string;
  timestamp: number;
}



const AdminDashboard: React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [pendingCalls, setPendingCalls] = useState<CallRequest[]>([]);
    const [activeCall, setActiveCall] = useState<CallRequest | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');
    const [isSharingScreen, setIsSharingScreen] = useState<boolean>(false);
    
    // References for media elements and WebRTC
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    
    // Initialize socket connection
    const socketUrl = import.meta.env.VITE_API_BASE_URL;
  const [adminId, setAdminId] = useState<any>("");
    
  useEffect(() => {
        const newSocket = io(socketUrl);
    
    newSocket.on('connect', () => {
        setConnectionStatus('Connected');
        setAdminId(newSocket.id);
      
      newSocket.emit('register',{userId:newSocket.id, userType:'admin'});
      
      newSocket.emit('getPendingCalls');
    });
    
    newSocket.on('pendingCalls', (calls: CallRequest[]) => {
      setPendingCalls(calls);
    });
    
    newSocket.on('incomingCall', (call: CallRequest) => {
      setPendingCalls(prev => [...prev, call]);
    });
    
    // WebRTC Signaling handlers
    newSocket.on('receiveOffer', async ({ senderId, offer }) => {
      console.log(`Received offer from ${senderId}`);
      if (!peerConnectionRef.current) {
        await initializePeerConnection();
      }
      
      await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnectionRef.current?.createAnswer();
      await peerConnectionRef.current?.setLocalDescription(answer);
      
      newSocket.emit('sendAnswer', {
        receiverId: senderId,
        answer
      });
    });
    
    newSocket.on('receiveAnswer', async ({ senderId, answer }) => {
      console.log(`Received answer from ${senderId}`);
      await peerConnectionRef.current?.setRemoteDescription(new RTCSessionDescription(answer));
    });
    
    newSocket.on('receiveIceCandidate', async ({ senderId, candidate }) => {
      console.log(`Received ICE candidate from ${senderId}`);
      await peerConnectionRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });
    
    newSocket.on('callEnded', ({ peerId }) => {
      console.log(`Call ended by ${peerId}`);
      handleEndCall();
    });
    
    setSocket(newSocket);
    
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      
      newSocket.disconnect();
    };
  }, [socketUrl]);
  
  // Initialize WebRTC peer connection
  const initializePeerConnection = async () => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    };
    
    const pc = new RTCPeerConnection(configuration);
    
    // Handle ICE candidates
    pc.onicecandidate = event => {
      if (event.candidate && socket && activeCall) {
        socket.emit('sendIceCandidate', {
          receiverId: activeCall.callerId,
          candidate: event.candidate
        });
      }
    };
    
    // Handle remote stream
    pc.ontrack = event => {
      if (remoteVideoRef.current && event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };
    
    // Handle connection state changes
    pc.onconnectionstatechange = () => {
      setConnectionStatus(pc.connectionState);
    };
    
    peerConnectionRef.current = pc;
    
    // Get local media stream
    try {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
      }
      
      // Add tracks to peer connection
      localStreamRef.current.getTracks().forEach(track => {
        if (localStreamRef.current && peerConnectionRef.current) {
          peerConnectionRef.current.addTrack(track, localStreamRef.current);
        }
      });
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };
  
  // Accept a call request
  const handleAcceptCall = async (call: CallRequest) => {
    
    if (!socket) return;
    
    // Initialize WebRTC connection
    await initializePeerConnection();
    
    // Notify server that admin accepted the call
    socket.emit('acceptCall', {
      callId: call.callId,
      adminId
    });
    
    // Set active call
    setActiveCall(call);
    
    // Create and send offer
    try {
      const offer = await peerConnectionRef.current?.createOffer();
      await peerConnectionRef.current?.setLocalDescription(offer);
      
      socket.emit('sendOffer', {
        receiverId: call.callerId,
        senderId:adminId,
        offer
      });
      console.log("offer sent");
      
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };
  
  // End current call
  const handleEndCall = () => {
    if (socket) {
      socket.emit('endCall', {
        userId: adminId,
        peerId:activeCall?.callerId
      });
    }
    
    // Stop all tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    
    // Clear video elements
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    
    setActiveCall(null);
    setIsSharingScreen(false);
  };
  
  // Toggle between camera and screen sharing
  const toggleScreenSharing = async () => {
    if (!peerConnectionRef.current || !socket || !activeCall) return;
    
    // Stop existing tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        track.stop();
        if (peerConnectionRef.current) {
          const senders = peerConnectionRef.current.getSenders();
          const sender = senders.find(s => s.track?.kind === track.kind);
          if (sender) {
            peerConnectionRef.current.removeTrack(sender);
          }
        }
      });
    }
    
    try {
      // Get new stream (either camera or screen)
      if (isSharingScreen) {
        // Switch back to camera
        localStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      } else {
        // Switch to screen sharing
        localStreamRef.current = await navigator.mediaDevices.getDisplayMedia({ video: true });
        
        // Add audio track if not included in screen share
        try {
          const audioTrack = (await navigator.mediaDevices.getUserMedia({ audio: true }))
            .getAudioTracks()[0];
          if (audioTrack && localStreamRef.current) {
            localStreamRef.current.addTrack(audioTrack);
          }
        } catch (error) {
          console.warn('Could not add audio track:', error);
        }
      }
      
      // Update local video
      if (localVideoRef.current && localStreamRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
      }
      
      // Add new tracks to peer connection
      localStreamRef.current.getTracks().forEach(track => {
        if (localStreamRef.current && peerConnectionRef.current) {
          peerConnectionRef.current.addTrack(track, localStreamRef.current);
        }
      });
      
      // Toggle state
      setIsSharingScreen(!isSharingScreen);
      
      // Renegotiate connection by creating a new offer
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      
      socket.emit('sendOffer', {
        receiverId: activeCall.callerId,
        offer
      });
    } catch (error) {
      console.error('Error switching media:', error);
    }
  };
  
  // Format timestamp to readable date/time
  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };
  
  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Support Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold">Admin ID:</span> {adminId}
            </div>
            <div>
              <span className="font-semibold">Status:</span>
              <span className={`ml-2 px-2 py-1 rounded text-sm ${
                connectionStatus === 'Connected' ? 'bg-green-100 text-green-800' : 
                connectionStatus === 'Disconnected' ? 'bg-red-100 text-red-800' : 
                'bg-yellow-100 text-yellow-800'
              }`}>
                {connectionStatus}
              </span>
            </div>
          </div>
        </div>
        
        {activeCall ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-4">Active Call</h2>
              <div className="mb-4">
                <p><span className="font-medium">User ID:</span> {activeCall.callerId}</p>
                <p><span className="font-medium">Issue:</span> {activeCall.issue || 'No issue specified'}</p>
                <p><span className="font-medium">Started:</span> {formatTimestamp(activeCall.timestamp)}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={toggleScreenSharing}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {isSharingScreen ? 'Switch to Camera' : 'Share Screen'}
                </button>
                <button 
                  onClick={handleEndCall}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  End Call
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Your Video</h3>
                  <div className="bg-gray-900 rounded overflow-hidden aspect-video">
                    <video 
                      ref={localVideoRef}
                      autoPlay 
                      muted 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">User Video</h3>
                  <div className="bg-gray-900 rounded overflow-hidden aspect-video">
                    <video 
                      ref={remoteVideoRef}
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">Pending Support Requests</h2>
            
            {pendingCalls.length === 0 ? (
              <p className="text-gray-500 italic">No pending support requests</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingCalls.map((call) => (
                      <tr key={call.callId}>
                        <td className="px-6 py-4 whitespace-nowrap">{call.callerId}</td>
                        <td className="px-6 py-4">{call.issue || 'No issue specified'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{formatTimestamp(call.timestamp)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleAcceptCall(call)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Accept Call
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;