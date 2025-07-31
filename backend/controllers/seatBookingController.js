const SeatBooking = require("../models/SeatBooking")

exports.createSeatBooking = async (req, res) => {
  try {
    const {pickupCity, exactPickup, dropCity, exactDrop, onDate} = req.body

    if (!pickupCity || !exactPickup || !dropCity || !exactDrop || !onDate) {
      return res.status(400).json({message: "Incomplete seat booking data"})
    }

    const seatBooking = new SeatBooking({pickupCity, exactPickup, dropCity, exactDrop, onDate})
    await seatBooking.save()

    return res.status(201).json({message: "Seat booking successful", booking: seatBooking})
  } catch (err) {
    return res.status(500).json({message: "Server error", error: err.message})
  }
}

exports.getUserSeatBooking = async (req, res) => {
  try {
    const bookings = await SeatBooking.find()
    res.status(200).json(bookings)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
