import { Navigate, Outlet } from 'react-router-dom';

const TechnicianRoute = () => {
  const profile = localStorage.getItem('profile');
  const user = profile ? JSON.parse(profile) : null;

  return user?.role === 'technician' ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};

export default TechnicianRoute;
