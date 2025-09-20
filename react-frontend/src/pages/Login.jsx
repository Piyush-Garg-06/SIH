import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Smartphone, Shield, Heart, Users, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    userType: 'worker',
    emailOrId: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Animation on component mount
  useState(() => {
    setIsVisible(true);
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock login - in real app, this would call an API
      const userData = {
        id: '12345',
        name: 'John Doe',
        email: formData.emailOrId,
        userType: formData.userType,
        healthId: formData.userType === 'worker' ? 'KL-MW-2023-001' : null
      };

      login(userData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Access your digital health records and stay connected with Kerala's healthcare system
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 animate-slide-in">
            <div className="flex items-center space-x-3">
              <Heart className="w-6 h-6 text-red-300" />
              <span className="text-lg">Comprehensive Health Tracking</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-green-300" />
              <span className="text-lg">Multi-User Access</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6 text-yellow-300" />
              <span className="text-lg">Secure & Government Approved</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-8 animate-fade-in">
            <div>
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-blue-200">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-blue-200">Healthcare Centers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200 to-blue-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className={`max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-blue-100 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

          {/* Header with gradient text */}
          <div className="text-center">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-fade-in">
              Sign In
            </h2>
            <p className="mt-3 text-sm text-gray-600 transition-colors duration-300">
              Or{' '}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500 transition-all duration-300 hover:scale-105 inline-block"
              >
                create a new account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {/* User Type Selection with Animation */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300">
                  I am a
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white hover:border-blue-400 transition-all duration-300 hover:shadow-md"
                >
                  <option value="worker">Migrant Worker</option>
                  <option value="doctor">Doctor/Healthcare Provider</option>
                  <option value="employer">Employer/Manager</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              {/* Email/ID Input with Animation */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <label htmlFor="emailOrId" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300">
                  Email or Health ID
                </label>
                <input
                  id="emailOrId"
                  name="emailOrId"
                  type="text"
                  required
                  value={formData.emailOrId}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white hover:border-blue-400 transition-all duration-300 hover:shadow-md focus:scale-105"
                  placeholder="Enter your email or health ID"
                />
              </div>

              {/* Password Input with Animation */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white hover:border-blue-400 transition-all duration-300 hover:shadow-md focus:scale-105"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-300 hover:scale-110"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900 transition-colors duration-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-all duration-300 hover:scale-105 inline-block"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button with Enhanced Animation */}
            <div className="transform transition-all duration-300 hover:scale-105">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LogIn className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" />
                </span>
                <span className="flex items-center">
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Divider with Animation */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Alternative Login Options with Enhanced Animations */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                <Smartphone className="h-5 w-5" />
                <span className="ml-2">OTP Login</span>
              </button>
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                <Shield className="h-5 w-5" />
                <span className="ml-2">Aadhaar</span>
              </button>
            </div>
          </div>

          {/* Additional Info with Animation */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 transition-colors duration-300">
              Secure login powered by Kerala Government
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
