/**
 * Improved navigation component
 */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // ADD THIS
import { APP_ROUTES } from '../../config/constants';
import ProfileDropdown from '../common/ProfileDropdown';
import LoginModal from '../auth/LoginModal';
import SignupModal from '../auth/SignupModal';


const Navbar = () => {
  const { user, isAuthenticated, isHost, logout } = useAuth(); // ADD THIS
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // ADD THIS
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // ADD THIS


  // Define navItems based on user type
  const getNavItems = () => {
    const commonItems = [
      { path: APP_ROUTES.TRIPS, label: 'Available Trips' }
    ];

    if (isAuthenticated) {
      commonItems.push({ path: APP_ROUTES.BOOKINGS, label: 'My Bookings' });
      
      if (isHost) {
        commonItems.push(
          { path: APP_ROUTES.HOST_TRIPS, label: 'My Hosted Trips' },
          { path: APP_ROUTES.HOST_NEW, label: 'Create Trip' },
          { path: APP_ROUTES.HOST_DASHBOARD, label: 'Host Dashboard' }
        );
      }
    }

    return commonItems;
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSwitchToSignup = () => {
  setIsLoginModalOpen(false);
  setIsSignUpModalOpen(true);
};

const handleSwitchToLogin = () => {
  setIsSignUpModalOpen(false);
  setIsLoginModalOpen(true);
};

const handleCloseModals = () => {
  setIsLoginModalOpen(false);
  setIsSignUpModalOpen(false);
};

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink 
            to={APP_ROUTES.HOME} 
            className="text-2xl font-bold text-yellow-600 hover:text-yellow-700 transition-colors"
          >
            BookBee
          </NavLink>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
  {getNavItems().map((item) => (
    <NavLink
      key={item.path}
      to={item.path}
      className={({ isActive }) => `
        relative px-3 py-2 text-sm font-medium transition-colors duration-200
        ${isActive 
          ? 'text-yellow-600' 
          : 'text-gray-600 hover:text-yellow-600'
        }
      `}
    >
      {({ isActive }) => (
        <>
          {item.label}
          {isActive && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-400 rounded-full" />
          )}
        </>
      )}
    </NavLink>
  ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
    {!isAuthenticated ? (
      <>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-yellow-600 transition-colors"
          onClick={() => setIsLoginModalOpen(true)}
        >
          Login
        </button>
        <button
          className="px-4 py-2 text-sm font-medium bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors"
          onClick={() => setIsSignUpModalOpen(true)}
        >
          Sign Up
        </button>
      </>
    ) : (
      <div className="relative">
        <button 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <span className="text-yellow-600 font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </button>
        <ProfileDropdown 
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          onLogout={handleLogout}
        />
      </div>
    )}
  </div>
</div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-yellow-600 focus:outline-none focus:text-yellow-600"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <LoginModal 
  isOpen={isLoginModalOpen} 
  onClose={handleCloseModals}
  onSwitchToSignup={handleSwitchToSignup}
/>
<SignupModal 
  isOpen={isSignUpModalOpen} 
  onClose={handleCloseModals}
  onSwitchToLogin={handleSwitchToLogin}
/>
    </nav>
  );
};

export default Navbar;
