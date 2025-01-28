import { Link } from 'react-router-dom';
import LoginImage from '/loginbg.png';

const LoginForm = () => {
  return (
    <div className="bg-primary min-h-screen flex items-center justify-center text-white">
      <div className="w-11/12 max-w-4xl bg-superior shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Section - Form */}
        <div className="p-8 flex flex-col justify-center">
          {/* Logo */}
          <Link
            className="text-2xl font-bold text-white mb-6 hover:text-white"
            to="/"
          >
            Fixo
          </Link>
          {/* Login Form */}
          <form action="" method="post" className="space-y-6">
            <h1 className="text-3xl font-bold mb-4 text-secondary">Log into your account</h1>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Enter email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                className="w-full p-3 rounded-md bg-primary border border-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Enter password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your password"
                className="w-full p-3 rounded-md bg-primary border border-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-secondary text-primary font-bold rounded-md hover:bg-white hover:text-secondary transition"
            >
              Sign in
            </button>
          </form>
          <p className="text-sm mt-4">
            Forgot your password? Click{' '}
            <Link
              to="/forgot-password"
              className="text-secondary underline hover:text-white"
            >
              here
            </Link>
          </p>
        </div>
        {/* Right Section - Image */}
        <div className="hidden md:block">
          <img
            src={LoginImage}
            alt="Login illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
