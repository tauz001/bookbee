
const API_BASE_URL = "http://localhost:3000/api";

export const userBookingOnServer = async (payload) => {
  const endpoint = payload.bookingType === "reserveSeat" ? "bookings/seats" : "bookings/cabs";

  try {
    // Remove tripId and hostedTripId from payload to avoid duplication
    const { tripId, hostedTripId, ...cleanPayload } = payload;
    
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...cleanPayload,
        hostedTripId: payload.hostedTripId
      }),
    });

    if (!response.ok) {
      let errorMessage = "Booking failed";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = `HTTP error! status: ${response.status}`;
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Booking error:", error);
    throw error;
  }
};

export const getUserCabBooking = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/cabs`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching cab bookings:", error);
    throw error;
  }
};

export const getUserSeatBooking = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/seats`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching seat bookings:", error);
    throw error;
  }
};

export const getCabBookingById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/cabs/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching cab booking:", error);
    throw error;
  }
};

export const getSeatBookingById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/seats/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching seat booking:", error);
    throw error;
  }
}