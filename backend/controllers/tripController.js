const Trip = require("../models/Trip");
const { sendSuccess, sendCreated, sendNotFound, sendBadRequest, sendServerError } = require("../utils/responseHelper");

/**
 * Trip Controller - Handles all trip-related operations
 */
class TripController {
  
  /**
   * Create a new hosted trip
   */
  static async createTrip(req, res, next) {
    try {
      const {
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
      } = req.body;

      // Create trip with nested vehicle object
      const trip = new Trip({
        pickupCity,
        exactPickup,
        exactDrop,
        dropCity,
        seatFare,
        kmRate,
        date,
        vehicle: {
          model,
          number,
          type,
          seats
        }
      });

      const savedTrip = await trip.save();
      sendCreated(res, savedTrip, "Trip created successfully");

    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all active trips
   */
  static async getAllTrips(req, res, next) {
    try {
      const trips = await Trip.find({ isActive: true }).sort({ createdAt: -1 });
      sendSuccess(res, trips, "Trips retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get trip by ID
   */
  static async getTripById(req, res, next) {
    try {
      const { id } = req.params;
      const trip = await Trip.findById(id);

      if (!trip) {
        return sendNotFound(res, "Trip not found");
      }

      sendSuccess(res, trip, "Trip retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update trip by ID
   */
  static async updateTrip(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const trip = await Trip.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      );

      if (!trip) {
        return sendNotFound(res, "Trip not found");
      }

      sendSuccess(res, trip, "Trip updated successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete (deactivate) trip by ID
   */
  static async deleteTrip(req, res, next) {
    try {
      const { id } = req.params;
      
      const trip = await Trip.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );

      if (!trip) {
        return sendNotFound(res, "Trip not found");
      }

      sendSuccess(res, null, "Trip deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TripController;