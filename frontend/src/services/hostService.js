// frontend/src/services/hostService.js - UPDATED
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

export const hostTripToServer = async (pickupCity, exactPickup, exactDrop, dropCity, seatFare, kmRate, date, model, number, type, seats) => {
  try {
    console.log('🔄 Creating trip...');
    
    const response = await fetchWithConfig(`${API_BASE_URL}/trips`, {
      method: "POST",
      body: JSON.stringify({
        pickupCity, 
        exactPickup, 
        exactDrop, 
        dropCity, 
        seatFare, 
        kmRate, 
        date, 
        model, 
        number, 
        type, 
        seats
      })
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
};

export const getHostedTrips = async () => {
  try {
    const response = await fetchWithConfig(`${API_BASE_URL}/trips/my-trips`);
    
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
    console.error('❌ Error fetching trips:', error);
    throw error;
  }
};

export const getHostedTrip = async (tripId) => {
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
};

export const updateTrip = async (tripId, tripData) => {
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
};

export const deleteTrip = async (tripId) => {
  try {
    const response = await fetchWithConfig(`${API_BASE_URL}/trips/${tripId}`, {
      method: "DELETE"
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
    console.error('❌ Error deleting trip:', error);
    throw error;
  }
};
