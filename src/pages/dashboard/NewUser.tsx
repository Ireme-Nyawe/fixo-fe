import { useState } from 'react';
import { FaSave, FaCheck } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';
import { Link } from 'react-router-dom';
import ViewUsersNavbar from '../../components/dashboard/ViewUsersNavbar';
import { adminCreateUser } from '../../state/features/user/userService';

const NewUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const password = '1234';
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('technician');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!firstName.trim()) newErrors.firstName = 'Firstname is required';
    if (!lastName.trim()) newErrors.lastName = 'Lastname is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!phone.trim()) newErrors.phone = 'Phone is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {

      const response = await adminCreateUser({
        firstName,
        lastName,
        email,
        username,
        password,
        role,
        phone,
      });

      if (response.status === 201) {
        toast.success('User created successfully');
        setIsSuccess(true);
        resetForm();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error(error.message || 'An unexpected error occurred');
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setUsername('');
    setPhone('');
    setErrors({});
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <Toaster richColors position="top-center" />
      <ViewUsersNavbar />

      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">Create User</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Define a new system user with their role and other properties.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setErrors((prev: any) => ({
                      ...prev,
                      firstName: undefined,
                    }));
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                  placeholder="e.g., John"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setErrors((prev: any) => ({
                      ...prev,
                      lastName: undefined,
                    }));
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                  placeholder="e.g., Doe"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev: any) => ({ ...prev, email: undefined }));
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                  placeholder="e.g., johndoe@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrors((prev: any) => ({
                      ...prev,
                      username: undefined,
                    }));
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                  placeholder="e.g., johndoe"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors((prev: any) => ({
                      ...prev,
                      phone: undefined,
                    }));
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                  placeholder="e.g., johndoe"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User role <span className="text-red-500">*</span>
                </label>
                <select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    setErrors((prev: any) => ({
                      ...prev,
                      role: undefined,
                    }));
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.role ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`}
                >
                  <option value="technician">Technician</option>
                  <option value="admin">Admin</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaSave className="w-5 h-5" />
              Save user
            </button>
          </div>
        </form>

        {isSuccess && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/90 rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  User Created!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your new user has been successfully created
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
                  >
                    Add Another
                  </button>
                  <Link
                    to="/dashboard/manage-users"
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    View list
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewUser;
