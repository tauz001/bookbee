const mongoose = require("mongoose");

/**
 * Seat booking schema for shared rides
 */
const seatBookingSchema = new mongoose.Schema({
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
  dropCity: {
    type: String,
    required: [true, "Drop city is required"],
    trim: true,
    lowercase: true
  },
  exactDrop: {
    type: String,
    required: [true, "Exact drop location is required"],
    trim: true
  },
  
  // Booking Details
  tripDate: {
    type: Date,
    required: [true, "Trip date is required"]
  },
  
  numberOfSeats: {
    type: Number,
    required: [true, "Number of seats is required"],
    min: [1, "At least one seat must be booked"],
    validate: {
      validator: Number.isInteger,
      message: "Number of seats must be a whole number"
    }
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
seatBookingSchema.index({ tripId: 1 });
seatBookingSchema.index({ status: 1 });

module.exports = mongoose.model("SeatBooking", seatBookingSchema);
