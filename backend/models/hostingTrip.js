const mongoose = require("mongoose")

const tripHostingSchema = mongoose.Schema(
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
    fare: {
      type: Number,
      required: true,
    },
  },
  {timestamps: true}
)

module.exports = mongoose.model("HostedTrip", tripHostingSchema)
