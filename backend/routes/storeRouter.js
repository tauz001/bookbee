const express = require("express")
const router = express.Router()

const {createSeatBooking} = require("../controllers/seatBookingController")
const {createCabBooking} = require("../controllers/cabBookingController")

router.post("/seatbooking", createSeatBooking)
router.post("/cabbooking", createCabBooking)

module.exports = router
