import { useEffect, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { io } from 'socket.io-client';

const ProtectedRoute = () => {
  const isAuthenticated = sessionStorage.getItem('token');
  const profile = localStorage.getItem('profile');
  const user = profile ? JSON.parse(profile) : null;


  const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

  const technicianName = user?.lastName;
  const technicianId = useRef<string>(crypto.randomUUID());


  const playNotificationSound = () => {
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/beep-05.mp3');
    audio.play()
      .catch(err => console.error('Failed to play notification sound:', err));
  };

useEffect(() => {
  const socket = io(SOCKET_URL);
   socket.on('connect', () => {
      console.log('Connected to signaling server');
      socket.emit('technicianOnline', {
        technicianId: technicianId.current,
        technicianName,
      });
    });


  socket.on("newSupportRequest", (request: any) => {
    if(user.role === 'technician'||user.role === 'admin'){
      playNotificationSound()
      console.log("New support request:", request);
    }
  });


  return () => {
    socket.disconnect();
  };
}, []);

  return isAuthenticated && user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
