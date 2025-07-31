const express = require("express")
const router = express.Router()

const {createSeatBooking, getUserSeatBooking} = require("../controllers/seatBookingController")
const {createCabBooking, getUserCabBooking} = require("../controllers/cabBookingController")

router.post("/seatbooking", createSeatBooking)
router.post("/cabbooking", createCabBooking)
router.get("/cabbooking", getUserCabBooking)
router.get("/seatbooking", getUserSeatBooking)

module.exports = router
