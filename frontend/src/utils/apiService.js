/**
 * Centralized API service for all HTTP requests
 */
import { API_CONFIG } from '../config/constants';

class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  /**
   * Generic HTTP request method
   */
  async request(endpoint, options = {}) {
  const url = `${this.baseURL}${endpoint}`;
  const config = {
    credentials: 'include', // ADD THIS - CRITICAL for session auth
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add body for POST/PUT requests
  if (config.body && typeof config.body !== 'string') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        message: `HTTP ${response.status}: ${response.statusText}` 
      }));
      throw new Error(errorData.message || 'Request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Request failed: ${endpoint}`, error);
    throw error;
  }
}

  // HTTP Methods
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, { 
      method: 'POST', 
      body: data 
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, { 
      method: 'PUT', 
      body: data 
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export default new ApiService();