import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Home, Info, Heart, CreditCard, UserPlus, Briefcase, Mail,
  Stethoscope, Users, Shield, Bell, FileText, Calendar,
  LogOut, User
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Role-based navigation items
  const getNavItems = () => {
    if (!user) {
      // Public navigation
      return [
        { path: '/', label: 'Home', icon: Home },
        { path: '/about', label: 'About', icon: Info },
        { path: '/services', label: 'Services', icon: Heart },
        { path: '/contact', label: 'Contact', icon: Mail },
      ];
    }

    switch (user.userType) {
      case 'worker':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: Home },
          { path: '/healthcard', label: 'My Health Card', icon: CreditCard },
          { path: '/health-records', label: 'Medical Records', icon: FileText },
          { path: '/appointments', label: 'Appointments', icon: Calendar },
          { path: '/notifications', label: 'Notifications', icon: Bell },
        ];
      case 'doctor':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: Home },
          { path: '/patients', label: 'My Patients', icon: Users },
          { path: '/health-checkups', label: 'Health Checkups', icon: Stethoscope },
          { path: '/reports', label: 'Medical Reports', icon: FileText },
          { path: '/notifications', label: 'Notifications', icon: Bell },
        ];
      case 'employer':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: Home },
          { path: '/workers', label: 'My Workers', icon: Users },
          { path: '/health-compliance', label: 'Health Compliance', icon: Shield },
          { path: '/reports', label: 'Reports', icon: FileText },
          { path: '/notifications', label: 'Notifications', icon: Bell },
        ];
      case 'admin':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: Home },
          { path: '/workers', label: 'All Workers', icon: Users },
          { path: '/doctors', label: 'Doctors', icon: Stethoscope },
          { path: '/employers', label: 'Employers', icon: Briefcase },
          { path: '/health-monitoring', label: 'Health Monitoring', icon: Shield },
          { path: '/reports', label: 'System Reports', icon: FileText },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center py-3">
            <Link to="/" className="text-xl font-bold mr-6">
              Kerala Health Portal
            </Link>
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`hover:bg-blue-700 px-3 py-2 rounded-md font-medium flex items-center transition-colors ${
                        isActive ? 'bg-blue-700' : ''
                      }`}
                    >
                      <Icon className="mr-1 w-4 h-4" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center space-x-4 pb-3 md:pb-0">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.name}</span>
                  <span className="bg-blue-600 px-2 py-1 rounded text-xs capitalize">
                    {user.userType}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md font-medium flex items-center transition-colors"
                >
                  <LogOut className="mr-1 w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md font-medium flex items-center transition-colors"
                >
                  <UserPlus className="mr-1 w-4 h-4" />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
