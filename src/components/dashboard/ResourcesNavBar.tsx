import { FaList, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResourcesNavBar = () => {
  return (
    <div className="bg-primary/85 backdrop-blur-sm shadow-lg p-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
      <div className="hidden sm:flex items-center gap-2 mr-4">
        <FaBook className="text-white text-xl" />
        <h2 className="text-white font-semibold text-lg">Resources</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Link
          to="/dashboard/resources"
          className="bg-secondary/20 hover:bg-secondary/40 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaList className="flex-shrink-0" />
          <span className="truncate">My Resources</span>
        </Link>

        <Link
          to="/resources"
          className="bg-secondary/20 hover:bg-secondary/40 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaBook className="flex-shrink-0" />
          <span className="truncate">Browse Resources</span>
        </Link>
      </div>
    </div>
  );
};

export default ResourcesNavBar;
