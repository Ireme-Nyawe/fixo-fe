import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import TechnicianCallView from './TechnicianCallView';
import RequestPayment from '../technician/payments/RequestPayment';

interface SupportRequest {
  userId: string;
  username: string;
  timestamp: number;
}

const TechnicianDashboard: React.FC<any> = () => {
  const profileString = localStorage.getItem('profile');
  const profile = profileString ? JSON.parse(profileString) : null;
  const technicianName = profile?.lastName;
  const technicianId = useRef<string>(crypto.randomUUID());

  const [socket, setSocket] = useState<Socket | null>(null);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [activeCall, setActiveCall] = useState<SupportRequest | null>(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

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
        technicianId: technicianId.current,
        technicianName,
      });
    });

    socket.on('newSupportRequest', (request: SupportRequest) => {
      console.log('New support request:', request);
      setSupportRequests((prev) => [...prev, request]);
    });

    socket.on('supportRequestEnded', ({ userId }) => {
      console.log('Support request ended by user:', userId);
      setSupportRequests((prev) => prev.filter((req) => req.userId !== userId));

      if (activeCall && activeCall.userId === userId) {
        setActiveCall(null);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('newSupportRequest');
      socket.off('supportRequestEnded');
    };
  }, [socket, activeCall]);

  const handleAcceptCall = (request: SupportRequest) => {
    setActiveCall(request);
    console.log('request', request);

    socket?.emit('acceptSupport', {
      userId: request.userId,
      technicianId: technicianId.current,
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
          technicianId={technicianId.current}
          technicianName={technicianName}
          onEndCall={handleEndCall}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Clients support requests</h1>
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

export default TechnicianDashboard;
