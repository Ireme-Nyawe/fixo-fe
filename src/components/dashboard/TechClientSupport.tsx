import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import TechnicianCallView from './TechnicianCallView';
import RequestPayment from '../technician/payments/RequestPayment';
import { Check, Copy } from "lucide-react";

interface SupportRequest {
  userId: string;
  username: string;
  timestamp: number;
}

const TechClientSupport: React.FC<any> = () => {
  const profileString = localStorage.getItem('profile');
  const profile = profileString ? JSON.parse(profileString) : null;
  const technicianName = profile?.lastName;
  const technicianId = profile?._id

  const [socket, setSocket] = useState<Socket | null>(null);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [activeCall, setActiveCall] = useState<SupportRequest | null>(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;
    const [copied, setCopied] = useState(false);
  
    const supportLink = `${window.location.origin}/direct-support/${technicianId}`;
  
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(supportLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
    const playNotificationSound = () => {
      const audio = new Audio('https://www.soundjay.com/buttons/sounds/beep-05.mp3');
      audio.play()
        .catch(err => console.error('Failed to play notification sound:', err));
    };
  

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('Connected to signaling server');
      socket.emit('technicianOnline', {
        technicianId: technicianId,
        technicianName,
      });
    });

    socket.on("newSupportRequest", (request: SupportRequest) => {
      console.log("New support request:", request);
      if(profile.role === 'technician'||profile.role === 'admin'){
        playNotificationSound()
        console.log("New support request:", request);
      }
      setSupportRequests((prev) => [...prev, request]);
    });

    socket.on('supportRequestEnded', ({ userId }) => {
      console.log('Support request ended by user:', userId);
      setSupportRequests((prev) => prev.filter((req) => req.userId !== userId));

      if (activeCall && activeCall.userId === userId) {
        setActiveCall(null);
      }
    });
    
    socket.on("supportEnded", (data: any) => {
      const userId = typeof data === 'object' && data.userId ? data.userId : data;
      
      console.log("Support ended for user:", userId);
      console.log("Current requests before removal:", supportRequests);
      
      setSupportRequests((prev) => {
        const updated = prev.filter((req) => req.userId !== userId);
        console.log("Updated requests after removal:", updated);
        return updated;
      });
      
      if (activeCall && activeCall.userId === userId) {
        setActiveCall(null);
      }
    });
    socket.on("requestCanceled", (data: any) => {
      const userId = typeof data === 'object' && data.userId ? data.userId : data;
      
      console.log("Support ended for user:", userId);
      console.log("Current requests before removal:", supportRequests);
      
      setSupportRequests((prev) => {
        const updated = prev.filter((req) => req.userId !== userId);
        console.log("Updated requests after removal:", updated);
        return updated;
      });
      
    });
    
    return () => {
      socket.off('connect');
      socket.off('newSupportRequest');
      socket.off('supportRequestEnded');
      socket.off('supportEnded');
    };
  }, [socket, activeCall]); 
  
  const handleAcceptCall = (request: SupportRequest) => {
    setActiveCall(request);
    console.log('request', request);

    socket?.emit('acceptSupport', {
      userId: request.userId,
      technicianId: technicianId,
      technicianName,
    });

    setSupportRequests((prev) =>
      prev.filter((req) => req.userId !== request.userId)
    );
  };

  const handleEndCall = () => {
    if (activeCall) {
      socket?.emit('endSupport', { userId: activeCall.userId });
      setActiveCall(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {activeCall ? (
        <TechnicianCallView
          socket={socket}
          user={activeCall}
          technicianId={technicianId}
          technicianName={technicianName}
          onEndCall={handleEndCall}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Clients support requests</h1>
            <div className="w-full max-w-md mx-auto">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        My Support Link
      </label>
      <div className="relative">
        <input
          type="text"
          value={supportLink}
          readOnly
          className="w-full pr-12 pl-4 py-2 border border-gray-300 rounded-2xl shadow-sm text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCopy}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent p-1 text-gray-600 hover:text-blue-600 transition"
        >
          {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
        </button>
      </div>
      {copied && (
        <p className="text-green-600 text-sm mt-1 animate-pulse">Copied to clipboard!</p>
      )}
    </div>


            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Request payment
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            {supportRequests.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No pending support requests.
              </p>
            ) : (
              <div className="space-y-4">
                <div className="divide-y">
                  {supportRequests.map((request) => (
                    <div
                      key={request.userId}
                      className="py-4 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{request.username}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(request.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAcceptCall(request)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Accept
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {showPaymentModal && (
        <RequestPayment onClose={() => setShowPaymentModal(false)} />
      )}
    </div>
  );
};

export default TechClientSupport;