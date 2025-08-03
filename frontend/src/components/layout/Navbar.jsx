/**
 * Improved navigation component
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { APP_ROUTES } from '../../config/constants';

const Navbar = () => {
  const navItems = [
    { path: APP_ROUTES.TRIPS, label: 'Available Trips' },
    { path: APP_ROUTES.BOOKINGS, label: 'My Bookings' },
    { path: APP_ROUTES.HOST_TRIPS, label: 'Host Trips' },
    { path: APP_ROUTES.HOST_NEW, label: 'Host New Trip' }
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
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-yellow-600 focus:outline-none focus:text-yellow-600"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
