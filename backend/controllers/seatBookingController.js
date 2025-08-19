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
      const { pickupCity, exactPickup, dropCity, exactDrop, onDate, hostedTripId, numberOfSeats } = req.body;

      // Validate required fields
      if (!pickupCity || !exactPickup || !dropCity || !exactDrop || !onDate || !hostedTripId || !numberOfSeats) {
        return sendBadRequest(res, "All booking fields are required");
      }

      // Validate number of seats
      if (!Number.isInteger(Number(numberOfSeats)) || numberOfSeats < 1) {
        return sendBadRequest(res, "Invalid number of seats");
      }

      // Verify trip exists and is active
      const trip = await Trip.findOne({ _id: hostedTripId, isActive: true });
      if (!trip) {
        return sendNotFound(res, "Trip not found or inactive");
      }

      // Create booking
      // Check if enough seats are available
      if (trip.vehicle && trip.vehicle.seats < numberOfSeats) {
        return sendBadRequest(res, "Not enough seats available");
      }

      const booking = new SeatBooking({
        pickupCity,
        exactPickup,
        dropCity,
        exactDrop,
        tripDate: new Date(onDate),
        tripId: hostedTripId,
        numberOfSeats,
        userId: req.session.userId
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
    // Check if user is authenticated
    if (!req.session.userId) {
      return sendBadRequest(res, "Authentication required");
    }

    // FIXED: Only return user's own bookings
    const bookings = await SeatBooking.find({ userId: req.session.userId })
      .populate({
        path: 'tripId',
        populate: {
          path: 'hostId',
          select: 'name mobile userType'
        }
      })
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
    
    const booking = await SeatBooking.findById(id)
      .populate({
        path: 'tripId',
        populate: {
          path: 'hostId',
          select: 'name mobile userType' // Add host info
        }
      });
    
    if (!booking) {
      return sendNotFound(res, "Seat booking not found");
    }

    sendSuccess(res, booking, "Seat booking retrieved successfully");
  } catch (error) {
    next(error);
  }
}

/**
 * Get seat bookings for host's trips
 */
static async getHostSeatBookings(req, res, next) {
  try {
    if (!req.session.userId) {
      return sendBadRequest(res, "Authentication required");
    }

    // Get host's trips first
    const Trip = require("../models/Trip");
    const hostTrips = await Trip.find({ hostId: req.session.userId });
    const tripIds = hostTrips.map(trip => trip._id);

    // Get bookings for host's trips
    const bookings = await SeatBooking.find({ tripId: { $in: tripIds } })
      .populate({
        path: 'tripId',
        populate: {
          path: 'hostId',
          select: 'name mobile userType'
        }
      })
      .populate('userId', 'name mobile')
      .sort({ createdAt: -1 });

    sendSuccess(res, bookings, "Host seat bookings retrieved successfully");
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