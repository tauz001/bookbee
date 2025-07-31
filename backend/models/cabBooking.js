const mongoose = require("mongoose")

const cabBookingSchema = new mongoose.Schema({
  pickupCity: {type: String, required: true},
  exactPickup: {type: String, required: true},
  dateTime: {type: Date, required: true},
  hostedTripId: {type: mongoose.Schema.Types.ObjectId, ref: "HostedTrip", required: true}, // Add this
  createdAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model("CabBooking", cabBookingSchema)
