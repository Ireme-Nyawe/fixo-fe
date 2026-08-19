import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaBox,
  FaUsers,
  FaUser,
  FaComments,
  FaSignOutAlt,
  FaExchangeAlt,
  FaPhone,
  FaBook,
  FaChalkboardTeacher,
} from 'react-icons/fa';

interface DashboardSidebarProps {
  isSidebarOpen: boolean;
  sideBarToggle: () => void;
}

interface SidebarLink {
  name: string;
  path: string;
  icon: JSX.Element;
}

const DashboardSidebar = ({
  isSidebarOpen,
  sideBarToggle,
}: DashboardSidebarProps) => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      const parsedProfile = JSON.parse(storedProfile);
      setUserRole(parsedProfile.role);
    }
  }, []);

  const commonLinks: SidebarLink[] = [
    { name: 'Chat', path: '/dashboard/chat', icon: <FaComments /> },
    { name: 'Support', path: '/dashboard/support', icon: <FaComments /> },
    ...(userRole === 'admin'
      ? [
          {
            name: 'Trainings',
            path: '/dashboard/trainings',
            icon: <FaChalkboardTeacher />,
          },
        ]
      : []),
    { name: 'Profile', path: '/dashboard/profile', icon: <FaUser /> },
    { name: 'Resources', path: '/dashboard/resources', icon: <FaBook /> },
  ];
  const adminLinks: SidebarLink[] = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
    { name: 'Manage Users', path: '/dashboard/manage-users', icon: <FaUsers /> },
    { name: 'Products', path: '/dashboard/products', icon: <FaBox /> },
    { name: 'Payments', path: '/dashboard/payments', icon: <FaExchangeAlt /> },
    {
      name: 'Call Sessions',
      path: '/dashboard/call-sessions',
      icon: <FaPhone />,
    },
  ];
  const technicianLinks: SidebarLink[] = [
    { name: 'Tech Dashboard', path: '/dashboard/tech', icon: <FaHome /> },
  ];

  let visibleLinks: SidebarLink[] = [];
  if (userRole === 'admin') {
    visibleLinks = [...visibleLinks, ...adminLinks];
  } else if (userRole === 'technician') {
    visibleLinks = [...visibleLinks, ...technicianLinks];
  }
  visibleLinks = [...visibleLinks, ...commonLinks];

  const isLinkActive = (link: SidebarLink) => {
    if (link.path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(link.path);
  };

  return (
    <>
      <aside
        className={`fixed md:relative z-30 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-primary h-full flex flex-col justify-between`}
      >
        <nav className="p-4 space-y-2 overflow-y-auto">
          {visibleLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                isLinkActive(link)
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
