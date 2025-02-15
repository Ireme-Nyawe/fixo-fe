import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Search } from 'lucide-react';
import { toast } from 'sonner';
import chatSlice from '../../../state/features/chat/chatSlice';
import { IUser } from '../../../types/store';
import Avatar from '/avatar.svg';

const NewChat = ({ isOpen, closeModal, startChat }: any) => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersList = async () => {
      setLoading(true);
      try {
        const response = await chatSlice.getAllUsers();

        if (response.status !== 200) {
          toast.error(response.message || 'Failed to fetch users');
          return;
        }

        setUsers(response.data.users || []);
      } catch (error: any) {
        toast.error(error.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsersList();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user?.firstName} ${user?.lastName}`
      .toLowerCase()
      .includes(search?.toLowerCase() || '')
  );

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Start a new conversation</h2>
          <button
            onClick={closeModal}
            className="text-gray-600 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full p-2 pl-10 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        </div>

        <div className="max-h-60 overflow-y-auto">
          {loading ? (
            <div>
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg animate-pulse"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-all"
                onClick={() => startChat(user)}
              >
                <img
                  src={Avatar}
                  alt={user.firstName}
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-800">
                  {user.firstName} {user.lastName}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No users found</p>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default NewChat;
