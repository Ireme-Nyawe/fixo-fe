import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  adminToggleUserStatus,
  adminViewAllUsers,
} from '../../state/features/user/userService';
import { IUser } from '../../types/store';
import Pagination from '../../components/dashboard/Pagination';
import SkeletonLoader from '../../components/dashboard/SkeletonLoader';
import ViewUsersNavbar from '../../components/dashboard/ViewUsersNavbar';
import { Switch } from '@headlessui/react';

const AdminViewUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await adminViewAllUsers();
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        toast.error(
          response.message || 'An error occurred while fetching users'
        );
      }
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (id: any) => {
    try {
      const response = await adminToggleUserStatus(id);
      if (response.status === 200) {
        toast.success('User status toggled successfully');
        fetchAllUsers();
      } else {
        toast.error('Failed to toggle user status');
      }
    } catch (error: any) {
      toast.error(error.message || 'Unknown error occured');
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredUsers = users
    .filter((user) =>
      user?.firstName?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a: any, b: any) =>
      sortOrder === 'asc'
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName)
    );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <ViewUsersNavbar />
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Users Management
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Manage your users easily here.
            </p>
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={handleSearch}
            className="border rounded-lg px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                  First Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                  Last Name
                </th>
                <th
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                  onClick={handleSort}
                >
                  Email {sortOrder === 'asc' ? '🔼' : '🔽'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && <SkeletonLoader rows={perPage} cols={5} />}
              {!loading && paginatedUsers.length > 0
                ? paginatedUsers.map((user: IUser) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {user.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        <Switch
                          checked={user.status}
                          onChange={() => toggleUserStatus(user?._id)}
                          className={`${
                            user.status ? 'bg-green-500' : 'bg-gray-300'
                          } relative inline-flex h-6 w-11 items-center rounded-full transition`}
                        >
                          <span
                            className={`${
                              user.status ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                          />
                        </Switch>
                      </td>
                    </tr>
                  ))
                : !loading && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>

        <Pagination
          total={filteredUsers.length}
          perPage={perPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AdminViewUsers;
