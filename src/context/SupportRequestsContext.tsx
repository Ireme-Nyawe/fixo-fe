import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
  } from "react";
  import socket from "../utils/socket";
  import authService from "../state/features/auth/authService";
  
  type SupportRequest = { userId: string; [key: string]: any };
  
  interface SupportRequestsContextType {
    supportRequests: SupportRequest[];
    setSupportRequests: React.Dispatch<React.SetStateAction<SupportRequest[]>>;
    isAcceptedCall: boolean;
    setIsAcceptedCall: React.Dispatch<React.SetStateAction<boolean>>;
    playRingtone: () => void;
    stopRingtone: () => void;
    unlockRingtone: () => void;
  }
  
  const SupportRequestsContext = createContext<SupportRequestsContextType | null>(null);
  
  export const SupportRequestsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
    const [isAcceptedCall, setIsAcceptedCall] = useState(false);
    const ringtoneRef = useRef<HTMLAudioElement | null>(null);
  
    const profile = JSON.parse(localStorage.getItem("profile") || "null");
    const unlockRingtone = () => {
      if (!ringtoneRef.current) {
        ringtoneRef.current = new Audio("/audio/ringtone-fixo.wav");
        ringtoneRef.current.loop = true;
      }
  
      ringtoneRef.current.muted = true;
      ringtoneRef.current
        .play()
        .then(() => {
          ringtoneRef.current!.pause();
          ringtoneRef.current!.muted = false;
          ringtoneRef.current!.currentTime = 0;
          console.log("Ringtone unlocked for autoplay");
        })
        .catch((err) => console.warn("⚠️ Unlock failed", err));
    };
  
    const playRingtone = () => {
      if (!ringtoneRef.current) {
        ringtoneRef.current = new Audio("/audio/ringtone-fixo.wav");
        ringtoneRef.current.loop = true;
      }
      ringtoneRef.current.currentTime = 0;
      ringtoneRef.current
        .play()
        .catch((err) => console.warn("⚠️ Play blocked", err));
    };
  
    const stopRingtone = () => {
      if (ringtoneRef.current) {
        ringtoneRef.current.pause();
        ringtoneRef.current.currentTime = 0;
      }
    };
  
    // Connect socket once
    useEffect(() => {
      if (profile) {
        authService.connectSocket();
      }
    }, [profile]);
  
    // Global socket listeners
    useEffect(() => {
      if (!profile) return;
  
      socket.on("newSupportRequest", (request) => {
        setSupportRequests((prev) => {
          if (prev.some((req) => req.userId === request.userId)) return prev;
          return [...prev, request];
        });
      });
  
      socket.on("supportRequestEnded", ({ userId }) => {
        setSupportRequests((prev) => prev.filter((req) => req.userId !== userId));
      });
  
      socket.on("supportEnded", (data) => {
        const userId = typeof data === "object" ? data.userId : data;
        setSupportRequests((prev) => prev.filter((req) => req.userId !== userId));
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
    }, [profile]);
  
    // Auto ringtone on incoming requests
    useEffect(() => {
      if (profile && supportRequests.length > 0 && !isAcceptedCall) {
        playRingtone();
      } else {
        stopRingtone();
      }
    }, [supportRequests, isAcceptedCall, profile]);
  
    return (
      <SupportRequestsContext.Provider
        value={{
          supportRequests,
          setSupportRequests,
          isAcceptedCall,
          setIsAcceptedCall,
          playRingtone,
          stopRingtone,
          unlockRingtone,
        }}
      >
        {children}
      </SupportRequestsContext.Provider>
    );
  };
  
  export const useSupportRequests = () => {
    const context = useContext(SupportRequestsContext);
    if (!context) {
      throw new Error("useSupportRequests must be used within SupportRequestsProvider");
    }
    return context;
  };
  