// frontend/src/services/homePageService.js - UPDATED
const API_BASE_URL = "http://localhost:3000/api";

const fetchWithConfig = (url, options = {}) => {
  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
};

export class HomePageService {
  
  static async submitContactForm(contactData) {
    try {
      console.log('🔄 Submitting contact form...', contactData);
      
      const response = await fetchWithConfig(`${API_BASE_URL}/contact`, {
        method: "POST",
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('✅ Contact form submitted successfully');
      return result.data;
    } catch (error) {
      console.error('❌ Contact form error:', error);
      throw error;
    }
  }

  static async getAllContacts(params = {}) {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_BASE_URL}/contact${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetchWithConfig(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error fetching contacts:', error);
      throw error;
    }
  }

  static async getContactById(contactId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/contact/${contactId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error fetching contact:', error);
      throw error;
    }
  }

  static async updateContactStatus(contactId, status) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/contact/${contactId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error updating contact status:', error);
      throw error;
    }
  }
}