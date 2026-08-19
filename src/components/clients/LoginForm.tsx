import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';
import { toast, Toaster } from 'sonner';
import { useFormik } from 'formik';
import LoginImage from '/loginbg.png';
import authService from '../../state/features/auth/authService';
import { io } from 'socket.io-client';
import { BACKEND_URL } from '../../utils/axios';

const LoginForm = () => {
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const socket = io(BACKEND_URL);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const saveToken = async (token: string) => {
    try {
      sessionStorage.setItem('token', token);
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await authService.getProfile();

      if (response.status === 200) {
        const profile = { ...response.data };
        delete profile.password;

        localStorage.setItem('profile', JSON.stringify(profile));
        if (response.data.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/dashboard/tech');
        }
      } else {
        toast.error(response.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Failed to get profile:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to fetch profile'
      );
    }
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await authService.login(values);
        if (response.status === 200) {
          if (response.message === 'OTP sent successfully') {
            toast.success('OTP sent successfully, check your email inbox!');
            localStorage.setItem('otpUserId', response?.data?.session?.userId);
            setShowOTPForm(true);
          } else {
            toast.success('Logged in successfully!');
            saveToken(response?.data?.content);
            await markUserOnline(response?.data?.userId);
            await fetchProfile();
          }
        } else toast.error(response.message || 'Incorrect email or password');
      } catch (error) {
        toast.error('An error occurred. Please try again later.');
        console.error('Login failed:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  const markUserOnline = async (_id: string) => {
    socket.emit('join', _id);

    socket.on('receiveMessage', async (data) => {
      toast.success(`New message from ${data.senderNames}`);
    });

    socket.emit('register', _id);

    return () => {
      socket.off();
    };
  };
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('otpUserId');

    try {
      const response = await authService.verifyOTP({ userId, otp });
      if (response?.status === 200) {
        toast.success('OTP verified successfully! Logging in...');
        saveToken(response?.data?.content);
        await markUserOnline(response?.data?.userId);
        localStorage.removeItem('otpUserId');
        await fetchProfile();
      } else {
        toast.error(response.message || 'Invalid OTP, please try again.');
      }
    } catch (error) {
      toast.error('An error occurred during OTP verification.');
      console.error('OTP verification failed:', error);
    }
  };

  const inputClass =
    'w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all';

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <Link to="/" className="inline-block mb-8">
              <img src="/logo.png" alt="Fixo" className="h-7 w-auto" />
            </Link>

            {showOTPForm ? (
              <form onSubmit={handleVerifyOTP} className="space-y-5">
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-slate-900">
                    OTP verification
                  </h1>
                  <p className="mt-1.5 text-sm text-slate-600">
                    Enter the code we sent to your email inbox.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="otp"
                    className="block text-xs font-medium text-slate-600 mb-1.5"
                  >
                    One-time code
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the code"
                    className={inputClass}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  Verify
                </button>
              </form>
            ) : (
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                <div>
                  <h1 className="text-xl font-semibold tracking-tight text-slate-900">
                    Log into your account
                  </h1>
                  <p className="mt-1.5 text-sm text-slate-600">
                    Welcome back. Enter your details to continue.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-slate-600 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...formik.getFieldProps('email')}
                    placeholder="you@example.com"
                    className={inputClass}
                    required
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium text-slate-600 mb-1.5"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...formik.getFieldProps('password')}
                    placeholder="Your password"
                    className={inputClass}
                    required
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="mt-1 text-xs text-red-600">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  {formik.isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
              </form>
            )}

            <Link
              to="/"
              className="mt-8 text-xs text-slate-500 hover:text-slate-900 transition-colors"
            >
              Back to home
            </Link>
          </div>

          <div className="hidden md:block border-l border-slate-200 bg-slate-100">
            <img
              src={LoginImage}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
