// frontend/src/services/bookingService.js - COMPLETE VERSION
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

export class BookingService {
  
  /**
   * Create a new booking (seat or cab)
   */
  static async createBooking(bookingData) {
    const endpoint = bookingData.bookingType === "reserveSeat" 
      ? `${API_BASE_URL}/bookings/seats`
      : `${API_BASE_URL}/bookings/cabs`;
    
    try {
      console.log('🔄 Creating booking...', bookingData);
      
      const { tripId, hostedTripId, bookingType, ...cleanPayload } = bookingData;
      
      const response = await fetchWithConfig(endpoint, {
        method: "POST",
        body: JSON.stringify({
          ...cleanPayload,
          hostedTripId: bookingData.hostedTripId
        })
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
      console.log('✅ Booking created successfully');
      return result.data;
    } catch (error) {
      console.error('❌ Booking error:', error);
      throw error;
    }
  }

  /**
   * Get all seat bookings
   */
  static async getSeatBookings() {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/bookings/seats`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error fetching seat bookings:', error);
      throw error;
    }
  }

  /**
   * Get all cab bookings
   */
  static async getCabBookings() {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/bookings/cabs`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error fetching cab bookings:', error);
      throw error;
    }
  }

  /**
   * Get all bookings (both seat and cab)
   */
  static async getAllBookings() {
    try {
      const [seatBookings, cabBookings] = await Promise.all([
        this.getSeatBookings(),
        this.getCabBookings()
      ]);

      return {
        seatBookings,
        cabBookings,
        totalBookings: seatBookings.length + cabBookings.length
      };
    } catch (error) {
      console.error('❌ Error fetching all bookings:', error);
      throw error;
    }
  }

  /**
   * Get seat booking by ID
   */
  static async getSeatBookingById(bookingId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/bookings/seats/${bookingId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error fetching seat booking:', error);
      throw error;
    }
  }

  /**
   * Get cab booking by ID
   */
  static async getCabBookingById(bookingId) {
    try {
      const response = await fetchWithConfig(`${API_BASE_URL}/bookings/cabs/${bookingId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error fetching cab booking:', error);
      throw error;
    }
  }

  /**
   * Update seat booking status
   */
  static async updateSeatBooking(bookingId, updateData) {
    try {
      console.log('🔄 Updating seat booking...');
      
      const response = await fetchWithConfig(`${API_BASE_URL}/bookings/seats/${bookingId}`, {
        method: "PUT",
        body: JSON.stringify(updateData)
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
      console.log('✅ Seat booking updated successfully');
      return result.data;
    } catch (error) {
      console.error('❌ Error updating seat booking:', error);
      throw error;
    }
  }

  /**
   * Update cab booking status
   */
  static async updateCabBooking(bookingId, updateData) {
    try {
      console.log('🔄 Updating cab booking...');
      
      const response = await fetchWithConfig(`${API_BASE_URL}/bookings/cabs/${bookingId}`, {
        method: "PUT",
        body: JSON.stringify(updateData)
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
      console.log('✅ Cab booking updated successfully');
      return result.data;
    } catch (error) {
      console.error('❌ Error updating cab booking:', error);
      throw error;
    }
  }

  /**
   * Cancel seat booking
   */
  static async cancelSeatBooking(bookingId) {
    return this.updateSeatBooking(bookingId, { status: 'cancelled' });
  }

  /**
   * Cancel cab booking
   */
  static async cancelCabBooking(bookingId) {
    return this.updateCabBooking(bookingId, { status: 'cancelled' });
  }

  /**
   * Complete seat booking
   */
  static async completeSeatBooking(bookingId) {
    return this.updateSeatBooking(bookingId, { status: 'completed' });
  }

  /**
   * Complete cab booking
   */
  static async completeCabBooking(bookingId) {
    return this.updateCabBooking(bookingId, { status: 'completed' });
  }

  /**
   * Get booking by ID and type (utility method)
   */
  static async getBookingById(bookingId, type) {
    if (type === 'seat') {
      return this.getSeatBookingById(bookingId);
    } else if (type === 'cab') {
      return this.getCabBookingById(bookingId);
    } else {
      throw new Error('Invalid booking type. Use "seat" or "cab"');
    }
  }

  /**
   * Update booking by ID and type (utility method)
   */
  static async updateBooking(bookingId, type, updateData) {
    if (type === 'seat') {
      return this.updateSeatBooking(bookingId, updateData);
    } else if (type === 'cab') {
      return this.updateCabBooking(bookingId, updateData);
    } else {
      throw new Error('Invalid booking type. Use "seat" or "cab"');
    }
  }

  /**
   * Cancel booking by ID and type (utility method)
   */
  static async cancelBooking(bookingId, type) {
    if (type === 'seat') {
      return this.cancelSeatBooking(bookingId);
    } else if (type === 'cab') {
      return this.cancelCabBooking(bookingId);
    } else {
      throw new Error('Invalid booking type. Use "seat" or "cab"');
    }
  }
}