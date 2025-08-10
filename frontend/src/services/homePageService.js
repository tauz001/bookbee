const API_BASE_URL = "http://localhost:3000/api";

export class HomePageService {
  
  /**
   * Submit contact form data to backend
   */
  static async submitContactForm(contactData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }
  }

  /**
   * Get all contact submissions (admin use)
   */
  static async getAllContacts(params = {}) {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `${API_BASE_URL}/contact${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  }

  /**
   * Get contact by ID
   */
  static async getContactById(contactId) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${contactId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error fetching contact:", error);
      throw error;
    }
  }

  /**
   * Update contact status
   */
  static async updateContactStatus(contactId, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${contactId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error updating contact status:", error);
      throw error;
    }
  }
}