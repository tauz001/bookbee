const CabBooking = require("../models/CabBooking")

exports.createCabBooking = async (req, res) => {
  try {
    const {pickupCity, exactPickup, dateTime} = req.body

    if (!pickupCity || !exactPickup || !dateTime) {
      return res.status(400).json({message: "Incomplete cab booking data"})
    }

    const cabBooking = new CabBooking({pickupCity, exactPickup, dateTime})
    await cabBooking.save()

    return res.status(201).json({message: "Cab booking successful", booking: cabBooking})
  } catch (err) {
    return res.status(500).json({message: "Server error", error: err.message})
  }
}
