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


exports.getSeatBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await SeatBooking.findById(id);
    
    if (!booking) {
      return res.status(404).json({ message: "Seat booking not found" });
    }
    
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};