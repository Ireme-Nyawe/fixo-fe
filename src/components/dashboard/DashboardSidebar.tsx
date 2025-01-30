import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaExchangeAlt,
  FaTools,
  FaUsers,
  FaChartBar,
  FaCog,
  FaProductHunt,
  FaBox,
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

  const links = [
    { name: 'Dashboard', icon: <FaHome /> },
    { name: 'Products', icon: <FaBox /> },
  ];

  return (
    <>
      <aside
        className={`fixed md:relative z-30 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-primary h-full`}
      >
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={
                link.name === 'Dashboard'
                  ? '/dashboard'
                  : `/dashboard/${link.name.toLowerCase()}`
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
