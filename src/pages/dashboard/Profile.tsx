import { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { toast, Toaster } from 'sonner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authService from '../../state/features/auth/authService';
import { FaTimes } from 'react-icons/fa';
import { formatDateToCustomString } from '../../helpers/time';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .max(50, 'First name too long'),
  lastName: Yup.string()
    .required('Last name is required')
    .max(50, 'Last name too long'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?[0-9\s\-()]{8,}$/, 'Invalid phone number')
    .required('Phone number is required'),
});

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await authService.updateProfile({
          ...values,
          role,
        });

        if (response.status === 200) {
          toast.success('Profile updated successfully');
          setIsEditing(false);
        } else {
          toast.error(response.message || 'Update failed');
        }
      } catch (error: any) {
        console.error('Update failed:', error);
        toast.error(error.message || 'Update failed');
      }
    },
  });

  const fetchProfile = async () => {
    try {
      const response = await authService.getProfile();

      if (response.status === 200) {
        const { firstName, lastName, email, phone } = response.data;
        setUpdatedAt(response.data.updatedAt);
        formik.setValues({
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || '',
          phone: phone || '',
        });
        setRole(response.data.role);
        setIsLoading(false);
      } else {
        toast.error(response.message || 'Failed to fetch profile');
      }
    } catch (error: any) {
      console.error('Failed to get profile:', error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster richColors position="top-center" />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Profile Settings
        </h1>

        {isLoading ? (
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-sm rounded-lg p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update your personal details here
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 text-primary hover:text-primary-dark"
              >
                {isEditing ? (
                  <>
                    <FaTimes className="h-5 w-5" />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <PencilIcon className="h-5 w-5" />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm disabled:bg-gray-50"
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm disabled:bg-gray-50"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm disabled:bg-gray-50"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm disabled:bg-gray-50"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {formik.errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Role
                </label>
                <input
                  type="text"
                  id="role"
                  value={role.charAt(0).toUpperCase() + role.slice(1)}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm disabled:bg-gray-50"
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    formik.resetForm();
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary-dark disabled:opacity-50"
                >
                  {formik.isSubmitting ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            )}
          </form>
        )}
        <div className="mt-8 bg-white shadow-sm rounded-lg p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-900">Password</p>
              <p className="text-sm text-gray-500">
                Last updated at, {formatDateToCustomString(updatedAt)}
              </p>
            </div>
            <button className="text-primary hover:text-primary-dark text-sm font-medium">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
