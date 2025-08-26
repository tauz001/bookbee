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

      // Check for duplicate booking
      const bookingTime = new Date(dateTime);
      const existingBooking = await CabBooking.findOne({
        userId: req.session.userId,
        tripId: hostedTripId,
        dateTime: {
          $gte: new Date(bookingTime.getTime() - 5 * 60000), // 5 minutes before
          $lte: new Date(bookingTime.getTime() + 5 * 60000)  // 5 minutes after
        }
      });

      if (existingBooking) {
        return sendBadRequest(res, "A similar booking already exists within 5 minutes of this time");
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
    
    // FIXED: Only return user's own bookings
    const bookings = await CabBooking.find({ userId: req.session.userId })
      .populate({
        path: 'tripId',
        populate: {
          path: 'hostId',
          select: 'name mobile userType'
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
 * Get cab bookings for host's trips
 */
static async getHostCabBookings(req, res, next) {
  try {
    if (!req.session.userId) {
      return sendBadRequest(res, "Authentication required");
    }

    // Get host's trips first
    const Trip = require("../models/Trip");
    const hostTrips = await Trip.find({ hostId: req.session.userId });
    const tripIds = hostTrips.map(trip => trip._id);

    // Get bookings for host's trips
    const bookings = await CabBooking.find({ tripId: { $in: tripIds } })
      .populate({
        path: 'tripId',
        populate: {
          path: 'hostId',
          select: 'name mobile userType'
        }
      })
      .populate('userId', 'name mobile')
      .sort({ createdAt: -1 });

    sendSuccess(res, bookings, "Host cab bookings retrieved successfully");
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