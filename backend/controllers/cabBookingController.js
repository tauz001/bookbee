const CabBooking = require("../models/cabBooking");
const Trip = require("../models/Trip");
const { sendSuccess, sendCreated, sendNotFound, sendBadRequest, sendServerError } = require("../utils/responseHelper");

/**
 * CabBooking Controller - Handles cab booking operations
 */
class CabBookingController {
  
  /**
   * Create a new cab booking
   */
  static async createCabBooking(req, res, next) {
    try {
      const { pickupCity, exactPickup, dateTime, hostedTripId } = req.body;

      // Validate required fields
      if (!pickupCity || !exactPickup || !dateTime || !hostedTripId) {
        return sendBadRequest(res, "All booking fields are required");
      }

      // Verify trip exists and is active
      const trip = await Trip.findOne({ _id: hostedTripId, isActive: true });
      if (!trip) {
        return sendNotFound(res, "Trip not found or inactive");
      }

      // Create booking
      const booking = new CabBooking({
        pickupCity,
        exactPickup,
        dateTime: new Date(dateTime),
        tripId: hostedTripId,
        userId: req.session.userId
      });

      const savedBooking = await booking.save();
      await savedBooking.populate('tripId');

      sendCreated(res, savedBooking, "Cab booking created successfully");

    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all cab bookings
   */
  static async getAllCabBookings(req, res, next) {
  try {
     // Check if user is authenticated
    if (!req.session.userId) {
      return sendBadRequest(res, "Authentication required");
    }
    const bookings = await CabBooking.find()
      .populate({
        path: 'tripId',
        populate: {
          path: 'hostId',
          select: 'name mobile userType' // Add host info
        }
      })
      .sort({ createdAt: -1 });

    sendSuccess(res, bookings, "Cab bookings retrieved successfully");
  } catch (error) {
    next(error);
  }
}

  /**
   * Get cab booking by ID
   */
  static async getCabBookingById(req, res, next) {
  try {
    const { id } = req.params;
    
    const booking = await CabBooking.findById(id)
      .populate({
        path: 'tripId',
        populate: {
          path: 'hostId',
          select: 'name mobile userType' // Add host info
        }
      });
    
    if (!booking) {
      return sendNotFound(res, "Cab booking not found");
    }

    sendSuccess(res, booking, "Cab booking retrieved successfully");
  } catch (error) {
    next(error);
  }
}

  /**
   * Update cab booking status
   */
  static async updateCabBooking(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["confirmed", "cancelled", "completed"].includes(status)) {
        return sendBadRequest(res, "Invalid status value");
      }

      const booking = await CabBooking.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      ).populate('tripId');

      if (!booking) {
        return sendNotFound(res, "Cab booking not found");
      }

      sendSuccess(res, booking, "Cab booking updated successfully");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CabBookingController;