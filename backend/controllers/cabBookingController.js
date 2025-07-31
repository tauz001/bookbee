const CabBooking = require("../models/CabBooking")

exports.createCabBooking = async (req, res) => {
  try {
    const {pickupCity, exactPickup, dateTime, hostedTripId} = req.body

    if (!pickupCity || !exactPickup || !dateTime || !hostedTripId) {
      return res.status(400).json({message: "Incomplete cab booking data"})
    }

    const cabBooking = new CabBooking({pickupCity, exactPickup, dateTime, hostedTripId})
    await cabBooking.save()

    return res.status(201).json({message: "Cab booking successful", booking: cabBooking})
  } catch (err) {
    return res.status(500).json({message: "Server error", error: err.message})
  }
}

exports.getUserCabBooking = async (req, res) => {
  try {
    const bookings = await CabBooking.find().populate("hostedTripId")
    res.status(200).json(bookings)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

exports.getCabBookingById = async (req, res) => {
  try {
    const {id} = req.params
    const booking = await CabBooking.findById(id).populate("hostedTripId")

    if (!booking) {
      return res.status(404).json({message: "Cab booking not found"})
    }

    res.status(200).json(booking)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
