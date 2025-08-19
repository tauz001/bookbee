const express = require("express");
const { requireAuth, requireHost } = require("../middleware/authMiddleware");
const TripController = require("../controllers/tripController");
const router = express.Router();

/**
 * Trip Routes
 * Base path: /api/trips
 */

router.post("/", requireAuth, requireHost, TripController.createTrip);  // ADD requireAuth, requireHost
router.put("/:id", requireAuth, TripController.updateTrip);  // ADD requireAuth
router.delete("/:id", requireAuth, TripController.deleteTrip);  // ADD requireAuth
router.get("/my-trips", requireAuth, requireHost, TripController.getMyTrips);  // ADD requireAuth, requireHost

router.get("/", TripController.getAllTrips);
router.get("/:id", TripController.getTripById);
router.get("/my-trips", requireAuth, requireHost, TripController.getMyTrips);

module.exports = router;