const express = require("express");
const TripController = require("../controllers/tripController");
const router = express.Router();

/**
 * Trip Routes
 * Base path: /api/trips
 */

// Create new trip
router.post("/", TripController.createTrip);

// Get all trips
router.get("/", TripController.getAllTrips);

// Get trip by ID
router.get("/:id", TripController.getTripById);

// Update trip
router.put("/:id", TripController.updateTrip);

// Delete (deactivate) trip
router.delete("/:id", TripController.deleteTrip);

module.exports = router;