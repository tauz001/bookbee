const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    // Host reference - ADD THIS
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Host reference is required"]
    },
    
    // Route Information
    pickupCity: {
      type: String,
      required: [true, "Pickup city is required"],
      trim: true,
      lowercase: true
    },
    dropCity: {
      type: String,
      required: [true, "Drop city is required"],
      trim: true,
      lowercase: true
    },
    exactPickup: {
      type: [String],
      required: [true, "Pickup locations are required"],
      validate: {
        validator: function(arr) {
          return arr && arr.length > 0;
        },
        message: "At least one pickup location is required"
      }
    },
    exactDrop: {
      type: [String],
      required: [true, "Drop locations are required"],
      validate: {
        validator: function(arr) {
          return arr && arr.length > 0;
        },
        message: "At least one drop location is required"
      }
    },
    
    // Trip Details
    date: {
      type: String,
      required: [true, "Trip date is required"]
    },
    
    // Pricing
    seatFare: {
      type: Number,
      required: [true, "Seat fare is required"],
      min: [0, "Seat fare cannot be negative"]
    },
    kmRate: {
      type: Number,
      required: [true, "KM rate is required"],
      min: [0, "KM rate cannot be negative"]
    },
    
    // Vehicle Information
    vehicle: {
      model: {
        type: String,
        required: [true, "Vehicle model is required"],
        trim: true
      },
      number: {
        type: String,
        required: [true, "Vehicle number is required"],
        trim: true,
        uppercase: true
      },
      type: {
        type: String,
        required: [true, "Vehicle type is required"],
        enum: ["SUV", "Sedan", "Hatchback"],
        trim: true
      },
      seats: {
        type: Number,
        required: [true, "Number of seats is required"],
        min: [1, "Seats must be at least 1"],
        max: [20, "Seats cannot exceed 20"]
      }
    },
    
    // Status
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
tripSchema.index({ pickupCity: 1, dropCity: 1 });
tripSchema.index({ date: 1 });
tripSchema.index({ isActive: 1 });
tripSchema.index({ hostId: 1 }); // ADD INDEX FOR HOST

module.exports = mongoose.model("Trip", tripSchema);