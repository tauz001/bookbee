// REPLACE the entire AuthContext.jsx with this enhanced version
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const userData = await AuthService.checkAuth();
      setUser(userData);
    } catch (error) {
      setUser(null);
      throw new Error('Authentication check failed');
    } finally {
      setLoading(false);
      setInitializing(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const userData = await AuthService.login(credentials);
      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      const user = await AuthService.signup(userData);
      setUser(user);
      console.log('✅ Signup successful');
      return user;
    } catch (error) {
      console.error('❌ Signup failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      setUser(null);
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout failed:', error);
      // Still clear user state even if logout request fails
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    initializing,
    isAuthenticated: !!user,
    isHost: user?.userType === 'host',
    isCommuter: user?.userType === 'commuter',
    checkAuthStatus // Expose for manual refresh
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};