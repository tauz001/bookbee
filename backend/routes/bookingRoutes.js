const express = require("express");
const SeatBookingController = require("../controllers/seatBookingController");
const CabBookingController = require("../controllers/cabBookingController");
const router = express.Router();

/**
 * Booking Routes
 * Base path: /api/bookings
 */

// Seat Booking Routes
router.post("/seats", SeatBookingController.createSeatBooking);
router.get("/seats", SeatBookingController.getAllSeatBookings);
router.get("/seats/:id", SeatBookingController.getSeatBookingById);
router.put("/seats/:id", SeatBookingController.updateSeatBooking);

// Cab Booking Routes
router.post("/cabs", CabBookingController.createCabBooking);
router.get("/cabs", CabBookingController.getAllCabBookings);
router.get("/cabs/:id", CabBookingController.getCabBookingById);
router.put("/cabs/:id", CabBookingController.updateCabBooking);

module.exports = router;