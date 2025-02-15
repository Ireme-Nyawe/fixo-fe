import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      sessionStorage.clear();
      setLoading(false);
      navigate('/login');
    }, 3000);

    return () => clearTimeout(logoutTimer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {loading && (
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 border-8 border-gray-300 border-t-primary rounded-full animate-spin"></div>
          <span className="text-xl font-semibold text-gray-700">
            Logging out...
          </span>
        </div>
      )}
    </div>
  );
};

export default Logout;
