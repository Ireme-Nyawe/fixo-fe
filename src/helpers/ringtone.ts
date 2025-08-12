import { useRef } from "react";

const ringtoneRef = useRef<HTMLAudioElement | null>(null);
export const playRingtone = () => {
  if (!ringtoneRef.current) {
    ringtoneRef.current = new Audio("/audio/ringtone-fixo.wav");
    ringtoneRef.current.loop = true;
    ringtoneRef.current.play().catch((err) => console.log("Play blocked", err));
  }
};

export const stopRingtone = () => {
  if (ringtoneRef.current) {
    ringtoneRef.current.pause();
    ringtoneRef.current.currentTime = 0;
    ringtoneRef.current = null;
  }
};
