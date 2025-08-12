import React, { useEffect, useState ,useRef} from "react";
import TechnicianCallView from "./TechnicianCallView";
import RequestPayment from "../technician/payments/RequestPayment";
import { Check, Copy } from "lucide-react";
import socket from "../../utils/socket";
const TechClientSupport: React.FC<any> = () => {
  const profileString = localStorage.getItem("profile");
  const profile = profileString ? JSON.parse(profileString) : null;
  const technicianName = profile?.lastName;
  const technicianId = profile?._id;

  const [supportRequests, setSupportRequests] = useState<any[]>([]);
  const [activeCall, setActiveCall] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const supportLink = `${window.location.origin}/direct-support/${technicianId}`;

  const ringtoneRef = useRef<HTMLAudioElement | null>(null);
  const playRingtone = () => {
    if (!ringtoneRef.current) {
      ringtoneRef.current = new Audio("/audio/ringtone-fixo.wav");
      ringtoneRef.current.loop = true;
      ringtoneRef.current.play().catch((err) => console.log("Play blocked", err));
    }
  };
  
  const stopRingtone = () => {
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
      ringtoneRef.current = null;
    }
  };
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(supportLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    socket.emit("technicianOnline", {
      technicianId: profile._id,
      technicianName: profile.lastName,
    });
  }, [socket, profile._id]);
  useEffect(() => {
    if (!profile) return;
    if (!socket) return;
    socket.on("newSupportRequest", (request) => {
      console.log("New support request:", request);
      setSupportRequests((prev) => {
        const exists = prev.some((req) => req.userId === request.userId);
        if (exists) return prev;
        return [...prev, request];
      });
    });

    socket.on("supportRequestEnded", ({ userId }) => {
      setSupportRequests((prev) => prev.filter((req) => req.userId !== userId));
      if (activeCall?.userId === userId) setActiveCall(null);
    });

    socket.on("supportEnded", (data) => {
      const userId = typeof data === "object" ? data.userId : data;
      setSupportRequests((prev) => prev.filter((req) => req.userId !== userId));
      if (activeCall?.userId === userId) setActiveCall(null);
    });

    socket.on("requestCanceled", (data) => {
      const userId = typeof data === "object" ? data.userId : data;
      setSupportRequests((prev) => prev.filter((req) => req.userId !== userId));
    });

    return () => {
      socket.off("newSupportRequest");
      socket.off("supportRequestEnded");
      socket.off("supportEnded");
      socket.off("requestCanceled");
    };
  }, [profile, activeCall]);

  const handleAcceptCall = (request: any) => {
    setActiveCall(request);
    socket.emit("acceptSupport", {
      userId: request.userId,
      technicianId,
      technicianName,
    });
    setSupportRequests((prev) =>
      prev.filter((req) => req.userId !== request.userId)
    );
  };

  const handleEndCall = () => {
    if (activeCall) {
      socket.emit("endSupport", { userId: activeCall.userId });
      setActiveCall(null);
    }
  };
  useEffect(() => {
    if (supportRequests.length > 0 && !activeCall) {
      playRingtone();
    } else {
      stopRingtone();
    }
  }, [supportRequests, socket, activeCall]);

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
                  {copied ? (
                    <Check size={20} className="text-green-600" />
                  ) : (
                    <Copy size={20} />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-green-600 text-sm mt-1 animate-pulse">
                  Copied to clipboard!
                </p>
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
