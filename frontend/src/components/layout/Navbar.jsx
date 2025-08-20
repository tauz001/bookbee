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

// Add the SuccessModal component
const SuccessModal = ({ isOpen, onClose, modalType, modalMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 border border-gray-100 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white border-2 border-gray-200 rounded-full p-2 shadow-lg text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-all duration-200 flex items-center justify-center"
          style={{ width: '44px', height: '44px' }}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            modalType === 'success' 
              ? 'bg-green-100 text-green-600' 
              : 'bg-red-100 text-red-600'
          }`}>
            {modalType === 'success' ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          
          <h3 className={`text-2xl font-bold mb-2 ${
            modalType === 'success' ? 'text-gray-900' : 'text-red-600'
          }`}>
            {modalType === 'success' ? 'Success!' : 'Oops! Something went wrong'}
          </h3>
          
          <p className="text-gray-600 leading-relaxed">
            {modalMessage}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-amber-500 text-white py-3 px-6 rounded-xl hover:bg-amber-600 transition-colors font-semibold shadow-sm"
          >
            {modalType === 'success' ? 'Great!' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { user, isAuthenticated, isHost, logout } = useAuth(); // ADD THIS
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // ADD THIS
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // ADD THIS
  
  // Add success modal states
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success');

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
      // Show success message for logout
      setModalType('success');
      setModalMessage('You have been logged out successfully.');
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Logout failed:', error);
      setModalType('error');
      setModalMessage('Logout failed. Please try again.');
      setShowSuccessModal(true);
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

  // Add handlers for login/signup success
  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    setModalType('success');
    setModalMessage('Welcome back! You have successfully logged in.');
    setShowSuccessModal(true);
  };

  const handleSignupSuccess = () => {
    setIsSignUpModalOpen(false);
    setModalType('success');
    setModalMessage('Account created successfully! Welcome to BookBee.');
    setShowSuccessModal(true);
  };

  const handleAuthError = (errorMessage) => {
    setModalType('error');
    setModalMessage(errorMessage || 'An error occurred. Please try again.');
    setShowSuccessModal(true);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
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
            <div className="md:hidden flex items-center space-x-3">
              {/* Mobile Auth Buttons */}
              {!isAuthenticated ? (
                <>
                  <button
                    className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-yellow-600 transition-colors"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    Login
                  </button>
                  <button
                    className="px-3 py-1 text-sm font-medium bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition-colors"
                    onClick={() => setIsSignUpModalOpen(true)}
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="relative">
                  <button 
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <span className="text-yellow-600 font-semibold text-sm">
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

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                {getNavItems().map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `
                      block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                      ${isActive 
                        ? 'text-yellow-600 bg-yellow-50' 
                        : 'text-gray-600 hover:text-yellow-600 hover:bg-gray-50'
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
                
                {/* Mobile User Info (when authenticated) */}
                {isAuthenticated && (
                  <div className="px-3 py-2 border-t border-gray-200 mt-3">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100">
                        <span className="text-yellow-600 font-semibold">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{user?.userType}</div>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleCloseModals}
        onSwitchToSignup={handleSwitchToSignup}
        onLoginSuccess={handleLoginSuccess}
        onLoginError={handleAuthError}
      />
      <SignupModal 
        isOpen={isSignUpModalOpen} 
        onClose={handleCloseModals}
        onSwitchToLogin={handleSwitchToLogin}
        onSignupSuccess={handleSignupSuccess}
        onSignupError={handleAuthError}
      />
      
      {/* Success/Error Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        modalType={modalType}
        modalMessage={modalMessage}
      />

      {/* Add the animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;