import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaBox,
  FaUsers,
  FaTools,
  FaUser,
  FaComments,
  FaSignOutAlt,
} from 'react-icons/fa';

interface DashboardSidebarProps {
  isSidebarOpen: boolean;
  sideBarToggle: () => void;
}

const DashboardSidebar = ({
  isSidebarOpen,
  sideBarToggle,
}: DashboardSidebarProps) => {
  const [activeLink, setActiveLink] = useState('Dashboard');
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setUserRole(parsedProfile.role);
    }
  }, []);

  const commonLinks = [
    { name: 'Chat', icon: <FaComments /> },
    { name: 'Profile', icon: <FaUser /> },
  ];
  const adminLinks = [
    { name: 'Dashboard', icon: <FaHome /> },
    { name: 'Manage Users', icon: <FaUsers /> },
    { name: 'Products', icon: <FaBox /> },
  ];
  const technicianLinks = [
    { name: 'Tech Dashboard', icon: <FaHome /> },
    { name: 'Tools', icon: <FaTools /> },
  ];

  let visibleLinks: any = [];
  if (userRole === 'admin') {
    visibleLinks = [...visibleLinks, ...adminLinks];
  } else if (userRole === 'technician') {
    visibleLinks = [...visibleLinks, ...technicianLinks];
  }
  visibleLinks = [...visibleLinks, ...commonLinks];

  return (
    <>
      <aside
        className={`fixed md:relative z-30 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-primary h-full flex flex-col justify-between`}
      >
        <nav className="p-4 space-y-2">
          {visibleLinks.map((link: any) => (
            <Link
              key={link.name}
              to={
                link.name === 'Dashboard'
                  ? '/dashboard'
                  : link.name === 'Tech Dashboard'
                  ? '/dashboard/tech'
                  : `/dashboard/${link.name.toLowerCase().replace(/\s/g, '-')}`
              }
              onClick={() => setActiveLink(link.name)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                activeLink === link.name
                  ? 'bg-secondary text-white'
                  : 'hover:bg-secondary/50 text-white/80'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4">
          <Link
            to={'/dashboard/logout'}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors bg-red-600 text-white hover:bg-red-700"
          >
            <span className="text-xl">
              <FaSignOutAlt />
            </span>
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={sideBarToggle}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
