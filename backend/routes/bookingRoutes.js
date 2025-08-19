const express = require("express");
const SeatBookingController = require("../controllers/seatBookingController");
const CabBookingController = require("../controllers/cabBookingController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * Booking Routes
 * Base path: /api/bookings
 */

// Seat Booking Routes
router.post("/seats", requireAuth, SeatBookingController.createSeatBooking);
router.get("/seats", requireAuth, SeatBookingController.getAllSeatBookings);
router.get("/seats/:id", requireAuth, SeatBookingController.getSeatBookingById);
router.put("/seats/:id", requireAuth, SeatBookingController.updateSeatBooking);

// Cab Booking Routes
router.post("/cabs", requireAuth, CabBookingController.createCabBooking);
router.get("/cabs", requireAuth, CabBookingController.getAllCabBookings);
router.get("/cabs/:id", requireAuth, CabBookingController.getCabBookingById);
router.put("/cabs/:id", requireAuth, CabBookingController.updateCabBooking);

module.exports = router;