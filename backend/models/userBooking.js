const mongoose = require("mongoose")

const userSeatBookingSchema = mongoose.Schema(
  {
    pickupCity: {
      type: String,
      required: true,
    },
    date: Date,
    exactPickup: {
      type: String,
      required: true,
    },
    dropCity: {
      type: String,
      required: true,
    },
    exactDrop: {
      type: String,
      required: true,
    },
    onDate: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
)

module.exports = mongoose.model("UserSeatBooking", userSeatBookingSchema)

//pickupCity, exactPickup, dropCity, exactDrop, onDate
