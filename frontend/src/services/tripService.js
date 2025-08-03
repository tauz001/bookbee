/**
 * Trip-related API calls
 */
import ApiService from '../utils/apiService';
import { API_CONFIG } from '../config/constants';

export class TripService {
  
  /**
   * Create a new hosted trip
   */
  static async createTrip(tripData) {
    const response = await ApiService.post(API_CONFIG.ENDPOINTS.TRIPS, tripData);
    return response.data;
  }

  /**
   * Get all available trips
   */
  static async getAllTrips() {
    const response = await ApiService.get(API_CONFIG.ENDPOINTS.TRIPS);
    return response.data;
  }

  /**
   * Get trip by ID
   */
  static async getTripById(tripId) {
    const response = await ApiService.get(`${API_CONFIG.ENDPOINTS.TRIPS}/${tripId}`);
    return response.data;
  }

  /**
   * Update trip
   */
  static async updateTrip(tripId, tripData) {
    const response = await ApiService.put(`${API_CONFIG.ENDPOINTS.TRIPS}/${tripId}`, tripData);
    return response.data;
  }

  /**
   * Delete trip
   */
  static async deleteTrip(tripId) {
    const response = await ApiService.delete(`${API_CONFIG.ENDPOINTS.TRIPS}/${tripId}`);
    return response.data;
  }
}

