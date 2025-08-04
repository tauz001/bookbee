const API_BASE_URL = "http://localhost:3000/api";

export const hostTripToServer = async (pickupCity, exactPickup, exactDrop, dropCity, seatFare, kmRate, date, model, number, type, seats) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error posting trip:", error);
    throw error;
  }
};

export const getHostedTrips = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/trips`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error;
  }
};

export const getHostedTrip = async (tripId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trips/${tripId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching trip:", error);
    throw error;
  }
};

export const updateTrip = async (tripId, tripData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trips/${tripId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error updating trip:", error);
    throw error;
  }
};

export const deleteTrip = async (tripId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/trips/${tripId}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw error;
  }
};