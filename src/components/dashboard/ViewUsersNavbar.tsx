import { User2 } from 'lucide-react';
import { FaPlusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ViewUsersNavbar = () => {
  return (
    <div className="bg-primary/85 backdrop-blur-sm shadow-lg p-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
      <div className="hidden sm:flex items-center gap-2 mr-4">
        <User2 className="text-white text-xl" />
        <h2 className="text-white font-semibold text-lg">Users</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Link
          to="/dashboard/manage-users/new"
          className="bg-secondary/20 hover:bg-secondary/40 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlusSquare className="flex-shrink-0" />
          <span className="truncate">New User</span>
        </Link>
      </div>
    </div>
  );
};

export default ViewUsersNavbar;
