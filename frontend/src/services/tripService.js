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

export class TripService {
  static async createTrip(tripData) {
    try {
      console.log('🔄 Creating trip...');
      
      const response = await fetchWithConfig(`${API_BASE_URL}/trips`, {
        method: "POST",
        body: JSON.stringify(tripData)
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
      console.log('✅ Trip created successfully');
      return result.data;
    } catch (error) {
      console.error('❌ Error creating trip:', error);
      throw error;
    }
  }

  static async getAllTrips() {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/trips`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error fetching trips:', error);
      throw error;
    }
  }

  static async getTripById(tripId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/trips/${tripId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error fetching trip:', error);
      throw error;
    }
  }

  static async updateTrip(tripId, tripData) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/trips/${tripId}`, {
        method: "PUT",
        body: JSON.stringify(tripData)
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
      console.error('❌ Error updating trip:', error);
      throw error;
    }
  }

  static async deleteTrip(tripId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/trips/${tripId}`, {
        method: "DELETE"
      });
      
      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error deleting trip:', error);
      throw error;
    }
  }
}