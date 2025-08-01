const mongoose = require("mongoose")

const tripHostingSchema = mongoose.Schema(
  {
    pickupCity: {
      type: String,
      required: true,
    },
    date: Date,
    exactPickup: {
      type: Array,
      required: true,
    },
    dropCity: {
      type: String,
      required: true,
    },
    exactDrop: {
      type: Array,
      required: true,
    },
    seatFare: {  // For seat bookings
      type: Number,
      required: true,
    },
    kmRate: {    // For cab bookings
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
  },
  {timestamps: true}
)

module.exports = mongoose.model("HostedTrip", tripHostingSchema)