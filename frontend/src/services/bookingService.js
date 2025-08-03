/**
 * Booking-related API calls
 */
import ApiService from '../utils/apiService';
import { API_CONFIG, BOOKING_TYPES } from '../config/constants';

export class BookingService {
  
  /**
   * Create a booking (seat or cab)
   */
  static async createBooking(bookingData) {
    const endpoint = bookingData.bookingType === BOOKING_TYPES.SEAT 
      ? `${API_CONFIG.ENDPOINTS.BOOKINGS}/seats`
      : `${API_CONFIG.ENDPOINTS.BOOKINGS}/cabs`;
    
    const response = await ApiService.post(endpoint, bookingData);
    return response.data;
  }

  /**
   * Get all seat bookings
   */
  static async getSeatBookings() {
    const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.BOOKINGS}/seats`);
    return response.data;
  }

  /**
   * Get all cab bookings
   */
  static async getCabBookings() {
    const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.BOOKINGS}/cabs`);
    return response.data;
  }

  /**
   * Get seat booking by ID
   */
  static async getSeatBookingById(bookingId) {
    const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.BOOKINGS}/seats/${bookingId}`);
    return response.data;
  }

  /**
   * Get cab booking by ID
   */
  static async getCabBookingById(bookingId) {
    const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.BOOKINGS}/cabs/${bookingId}`);
    return response.data;
  }
}