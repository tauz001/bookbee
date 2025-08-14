// frontend/src/services/authService.js - UPDATED VERSION
const API_BASE_URL = "http://localhost:3000/api";

// Helper function for better error handling
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (jsonError) {
      // If JSON parsing fails, use status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

// Helper function to make fetch requests with proper config
const fetchWithConfig = (url, options = {}) => {
  return fetch(url, {
    ...options,
    credentials: 'include', // ALWAYS include credentials
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
};

export class AuthService {
  
  static async signup(userData) {
    try {
      console.log('🔄 Attempting signup...', userData);
      
      const response = await fetchWithConfig(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(userData)
      });

      const result = await handleResponse(response);
      console.log('✅ Signup successful', result);
      return result.data;
    } catch (error) {
      console.error('❌ Signup error:', error);
      throw error;
    }
  }

  static async login(credentials) {
    try {
      console.log('🔄 Attempting login...');
      
      const response = await fetchWithConfig(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials)
      });

      const result = await handleResponse(response);
      console.log('✅ Login successful', result);
      return result.data;
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  }

  static async logout() {
    try {
      console.log('🔄 Attempting logout...');
      
      const response = await fetchWithConfig(`${API_BASE_URL}/auth/logout`, {
        method: "POST"
      });

      await handleResponse(response);
      console.log('✅ Logout successful');
      return true;
    } catch (error) {
      console.error('❌ Logout error:', error);
      throw error;
    }
  }

  static async checkAuth() {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/auth/check`);
      
      if (!response.ok) {
        return null;
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Auth check error:', error);
      return null;
    }
  }

  static async getProfile() {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/auth/profile`);
      const result = await handleResponse(response);
      return result.data;
    } catch (error) {
      console.error('❌ Profile fetch error:', error);
      throw error;
    }
  }
}