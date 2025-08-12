/**
 * Improved navigation component
 */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from '../../config/constants';
import ProfileDropdown from '../common/ProfileDropdown';

const Navbar = ({ setIsLoginModalOpen, setIsSignUpModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { path: APP_ROUTES.TRIPS, label: 'Available Trips' },
    { path: APP_ROUTES.BOOKINGS, label: 'My Bookings' },
    { path: APP_ROUTES.HOST_TRIPS, label: 'Host Trips' },
    { path: APP_ROUTES.HOST_NEW, label: 'Host New Trip' },
    { path: APP_ROUTES.HOST_DASHBOARD, label: 'Host Dashboard' }
  ];

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
            {navItems.map((item) => (
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
              <button
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-yellow-600 transition-colors"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Login
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-yellow-600 transition-colors"
                onClick={() => setIsSignUpModalOpen(true)}
              >
                Sign Up
              </button>
              <div className="relative">
                <button 
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <ProfileDropdown 
                  isOpen={isProfileOpen}
                  onClose={() => setIsProfileOpen(false)}
                />
              </div>
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
    </nav>
  );
};

export default Navbar;
