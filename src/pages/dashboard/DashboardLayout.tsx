import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import DashboardSidebar from '../../components/dashboard/DashboardSidebar';
import { Toaster } from 'sonner';
import authService from '../../state/features/auth/authService';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    findProfile();
  }, [location.pathname]);

  const findProfile = async () => {
    try {
      const response = await authService.getProfile();
      if (response.status === 200) {
        localStorage.setItem('profile', JSON.stringify(response.data));
        setProfile(response.data);
      } else {
        console.error('Error fetching profile:', response.message);
      }
    } catch (error) {}
  };
  return (
    <div className="h-screen flex flex-col bg-primary overflow-hidden">
      <Toaster richColors position="top-center" />
      <DashboardHeader sideBarToggle={toggleSidebar} profile={profile} />

      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar
          isSidebarOpen={isSidebarOpen}
          sideBarToggle={toggleSidebar}
        />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
