import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const ProfileDropdown = ({ isOpen, onClose, user, onLogout }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 mt-2 w-64 transform transition-all duration-200 ease-in-out ${
        isOpen 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
        {/* Profile Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <p className="text-white font-semibold">{user?.name || 'User'}</p>
              <p className="text-yellow-100 text-sm capitalize">{user?.userType || 'Member'}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="py-2">
          <NavLink
            to="/profile"
            className={({ isActive }) => `
              flex items-center px-6 py-2.5 transition duration-150
              ${isActive 
                ? 'bg-yellow-50 text-yellow-600' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-yellow-600'
              }
            `}
            onClick={onClose}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Your Profile
          </NavLink>
          
          <NavLink
            to="/settings"
            className={({ isActive }) => `
              flex items-center px-6 py-2.5 transition duration-150
              ${isActive 
                ? 'bg-yellow-50 text-yellow-600' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-yellow-600'
              }
            `}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </NavLink>

          <div className="border-t border-gray-100 my-2"></div>

          <button
            className="w-full flex items-center px-6 py-2.5 text-red-600 hover:bg-red-50 transition duration-150"
            onClick={onLogout}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
