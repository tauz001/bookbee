const mongoose = require("mongoose")

const seatBookingSchema = new mongoose.Schema({
  pickupCity: {type: String, required: true},
  exactPickup: {type: String, required: true},
  dropCity: {type: String, required: true},
  exactDrop: {type: String, required: true},
  onDate: {type: Date, required: true},
  hostedTripId: {type: mongoose.Schema.Types.ObjectId, ref: "HostedTrip", required: true}, // Add this
  createdAt: {type: Date, default: Date.now},
})

module.exports = mongoose.model("SeatBooking", seatBookingSchema)
