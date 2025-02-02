import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const profile = localStorage.getItem('profile');
  const user = profile ? JSON.parse(profile) : null;

  return user?.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard/tech" replace />
  );
};

export default AdminRoute;
