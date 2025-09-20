import { Link } from 'react-router-dom';
import GovernmentBanner from './GovernmentBanner';
import Navigation from './Navigation';
import { LogIn } from 'lucide-react';

const Header = () => {
  return (
    <>
      <GovernmentBanner />
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="http://static.photos/government/120x120/1"
              alt="Kerala Government Logo"
              className="h-16"
            />
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Kerala Migrant Workers</h1>
              <h2 className="text-lg font-semibold text-blue-800">
                Digital Health Record Management System
              </h2>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium flex items-center"
            >
              <LogIn className="mr-2 w-4 h-4" />
              Login
            </Link>
          </div>
        </div>
      </header>
      <Navigation />
    </>
  );
};

export default Header;
