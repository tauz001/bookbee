const express = require("express");
const AuthController = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * Auth Routes
 * Base path: /api/auth
 */

// Public routes
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/check", AuthController.checkAuth);

// Protected routes
router.post("/logout", requireAuth, AuthController.logout);
router.get("/profile", requireAuth, AuthController.getProfile);

module.exports = router;