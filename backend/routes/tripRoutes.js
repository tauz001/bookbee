const express = require("express");
const { requireAuth, requireHost } = require("../middleware/authMiddleware");
const TripController = require("../controllers/tripController");
const router = express.Router();

/**
 * Trip Routes
 * Base path: /api/trips
 */

// Protected routes (order matters - specific routes first)
router.get("/my-trips", requireAuth, requireHost, TripController.getMyTrips);
router.post("/", requireAuth, requireHost, TripController.createTrip);
router.put("/:id", requireAuth, TripController.updateTrip);
router.delete("/:id", requireAuth, TripController.deleteTrip);

// Public routes
router.get("/", TripController.getAllTrips);
router.get("/:id", TripController.getTripById);

module.exports = router;