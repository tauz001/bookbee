const mongoose = require("mongoose");

/**
 * Cab booking schema for private rides
 */
const cabBookingSchema = new mongoose.Schema({
  // Route Information
  pickupCity: {
    type: String,
    required: [true, "Pickup city is required"],
    trim: true,
    lowercase: true
  },
  exactPickup: {
    type: String,
    required: [true, "Exact pickup location is required"],
    trim: true
  },
  
  // Booking Details
  dateTime: {
    type: Date,
    required: [true, "Pickup date and time is required"]
  },
  
  // Reference to hosted trip
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
    required: [true, "Trip reference is required"]
  },
  
  // Booking Status
  status: {
    type: String,
    enum: ["confirmed", "cancelled", "completed"],
    default: "confirmed"
  }
}, {
  timestamps: true
});

// Indexes
cabBookingSchema.index({ tripId: 1 });
cabBookingSchema.index({ status: 1 });

module.exports = mongoose.model("CabBooking", cabBookingSchema);