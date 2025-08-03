const SeatBooking = require("../models/SeatBooking");
const Trip = require("../models/Trip");
const { sendSuccess, sendCreated, sendNotFound, sendBadRequest, sendServerError } = require("../utils/responseHelper");

/**
 * SeatBooking Controller - Handles seat booking operations
 */
class SeatBookingController {
  
  /**
   * Create a new seat booking
   */
  static async createSeatBooking(req, res, next) {
    try {
      const { pickupCity, exactPickup, dropCity, exactDrop, onDate, hostedTripId } = req.body;

      // Validate required fields
      if (!pickupCity || !exactPickup || !dropCity || !exactDrop || !onDate || !hostedTripId) {
        return sendBadRequest(res, "All booking fields are required");
      }

      // Verify trip exists and is active
      const trip = await Trip.findOne({ _id: hostedTripId, isActive: true });
      if (!trip) {
        return sendNotFound(res, "Trip not found or inactive");
      }

      // Create booking
      const booking = new SeatBooking({
        pickupCity,
        exactPickup,
        dropCity,
        exactDrop,
        tripDate: new Date(onDate),
        tripId: hostedTripId
      });

      const savedBooking = await booking.save();
      await savedBooking.populate('tripId');

      sendCreated(res, savedBooking, "Seat booking created successfully");

    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all seat bookings
   */
  static async getAllSeatBookings(req, res, next) {
    try {
      const bookings = await SeatBooking.find()
        .populate('tripId')
        .sort({ createdAt: -1 });

      sendSuccess(res, bookings, "Seat bookings retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get seat booking by ID
   */
  static async getSeatBookingById(req, res, next) {
    try {
      const { id } = req.params;
      
      const booking = await SeatBooking.findById(id).populate('tripId');
      
      if (!booking) {
        return sendNotFound(res, "Seat booking not found");
      }

      sendSuccess(res, booking, "Seat booking retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update seat booking status
   */
  static async updateSeatBooking(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["confirmed", "cancelled", "completed"].includes(status)) {
        return sendBadRequest(res, "Invalid status value");
      }

      const booking = await SeatBooking.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      ).populate('tripId');

      if (!booking) {
        return sendNotFound(res, "Seat booking not found");
      }

      sendSuccess(res, booking, "Seat booking updated successfully");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SeatBookingController;