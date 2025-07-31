const express = require("express")
const router = express.Router()

const {createSeatBooking, getUserSeatBooking, getSeatBookingById} = require("../controllers/seatBookingController")
const {createCabBooking, getUserCabBooking, getCabBookingById} = require("../controllers/cabBookingController")

router.post("/seatbooking", createSeatBooking)
router.post("/cabbooking", createCabBooking)
router.get("/cabbooking", getUserCabBooking)
router.get("/seatbooking", getUserSeatBooking)

// Add these new routes
router.get("/cabbooking/:id", getCabBookingById)
router.get("/seatbooking/:id", getSeatBookingById)

module.exports = router