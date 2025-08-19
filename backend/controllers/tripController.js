const Trip = require("../models/Trip");
const User = require("../models/user");  // ADD THIS LINE
const { sendSuccess, sendCreated, sendNotFound, sendBadRequest, sendServerError } = require("../utils/responseHelper");

/**
 * Trip Controller - Handles all trip-related operations
 */
class TripController {
  
  /**
   * Create a new hosted trip (HOST ONLY)
   */
  static async createTrip(req, res, next) {
    try {
      // Check if user is authenticated and is a host
      if (!req.session.userId) {
        return sendBadRequest(res, "Authentication required");
      }
      
      if (req.session.userType !== 'host') {
        return sendBadRequest(res, "Only hosts can create trips");
      }

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

      // Create trip with nested vehicle object and host reference
     const user = await User.findById(req.session.userId);
if (!user) {
  return sendBadRequest(res, "User not found");
}

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
  },
  hostId: req.session.userId,
  hostName: user.name  // ADD THIS LINE
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
      const trips = await Trip.find({ isActive: true })
        .populate('hostId', 'name mobile userType') // POPULATE HOST INFO
        .sort({ createdAt: -1 });
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
      const trip = await Trip.findById(id)
        .populate('hostId', 'name mobile userType');

      if (!trip) {
        return sendNotFound(res, "Trip not found");
      }

      sendSuccess(res, trip, "Trip retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update trip by ID (HOST ONLY - OWN TRIPS)
   */
  static async updateTrip(req, res, next) {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Check authentication
      if (!req.session.userId) {
        return sendBadRequest(res, "Authentication required");
      }

      // Find trip and check ownership
      const trip = await Trip.findById(id);
      if (!trip) {
        return sendNotFound(res, "Trip not found");
      }

      if (trip.hostId.toString() !== req.session.userId) {
        return sendBadRequest(res, "You can only update your own trips");
      }

      const updatedTrip = await Trip.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      ).populate('hostId', 'name mobile userType');

      sendSuccess(res, updatedTrip, "Trip updated successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete (deactivate) trip by ID (HOST ONLY - OWN TRIPS)
   */
  static async deleteTrip(req, res, next) {
    try {
      const { id } = req.params;
      
      // Check authentication
      if (!req.session.userId) {
        return sendBadRequest(res, "Authentication required");
      }

      // Find trip and check ownership
      const trip = await Trip.findById(id);
      if (!trip) {
        return sendNotFound(res, "Trip not found");
      }

      if (trip.hostId.toString() !== req.session.userId) {
        return sendBadRequest(res, "You can only delete your own trips");
      }

      const deletedTrip = await Trip.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );

      sendSuccess(res, null, "Trip deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get trips hosted by current user
   */
  static async getMyTrips(req, res, next) {
    try {
      // Check authentication
      if (!req.session.userId) {
        return sendBadRequest(res, "Authentication required");
      }

      const trips = await Trip.find({ 
        hostId: req.session.userId,
        isActive: true 
      }).sort({ createdAt: -1 });

      sendSuccess(res, trips, "Your trips retrieved successfully");
    } catch (error) {
      next(error);
    }
  }
  static async getMyTrips(req, res, next) {
  try {
    // Check authentication
    if (!req.session.userId) {
      return sendBadRequest(res, "Authentication required");
    }

    if (req.session.userType !== 'host') {
      return sendBadRequest(res, "Host access required");
    }

    const trips = await Trip.find({ 
      hostId: req.session.userId,
      isActive: true 
    })
    .populate('hostId', 'name mobile userType') // ADD populate
    .sort({ createdAt: -1 });

    sendSuccess(res, trips, "Your trips retrieved successfully");
  } catch (error) {
    next(error);
  }
}
}

module.exports = TripController;