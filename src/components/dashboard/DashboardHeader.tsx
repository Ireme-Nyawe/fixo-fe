import { FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../helpers/textFormatting';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface DashboardHeaderProps {
  sideBarToggle: () => void;
  profile: any;
}

const DashboardHeader = ({ sideBarToggle, profile }: DashboardHeaderProps) => {
  const usePersistedState = (key: string, defaultValue: boolean) => {
    const [state, setState] = useState(() => {
      const storedValue =
        typeof window !== 'undefined' ? localStorage.getItem(key) : null;
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
  };

  const [showBalance, setShowBalance] = usePersistedState(
    'balanceVisibility',
    true
  );

  const toggleVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <header className="bg-primary text-white shadow-lg px-4 py-3 sm:p-4 flex items-center justify-between z-10">
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={sideBarToggle}
          className="md:hidden p-1.5 hover:bg-secondary rounded-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <h1 className="text-xl sm:text-2xl font-bold">Fixo</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="hidden sm:flex items-center gap-2 bg-secondary py-2 px-3 sm:px-4 rounded-lg select-none">
          <button
            onClick={toggleVisibility}
            className={`${
              showBalance
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                : 'bg-transparent hover:bg-gray-100 text-gray-400'
            } rounded-full p-1 transition-colors duration-200`}
            aria-label={showBalance ? 'Hide balance' : 'Show balance'}
          >
            {showBalance ? (
              <FiEyeOff size={18} className="text-current" />
            ) : (
              <FiEye size={18} className="text-current" />
            )}
          </button>

          <span className="text-sm sm:text-base">
            {showBalance ? (
              formatCurrency(profile?.balance)
            ) : (
              <span className="text-gray-500">••••••</span>
            )}
          </span>
        </div>

        <button className="p-1.5 sm:p-2 hover:bg-secondary rounded-full">
          <Bell />
        </button>

        <Link
          to={'/dashboard/profile'}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <span className="text-xs sm:text-sm">
            <FaUserAlt />
          </span>
        </Link>
      </div>
    </header>
  );
};

export default DashboardHeader;
