const express = require("express");
const ContactController = require("../controllers/contactController");
const router = express.Router();

/**
 * Contact Routes
 * Base path: /api/contact
 */

// Submit contact form
router.post("/", ContactController.submitContactForm);

// Get all contact submissions (admin)
router.get("/", ContactController.getAllContacts);

// Get contact by ID
router.get("/:id", ContactController.getContactById);

// Update contact status
router.put("/:id/status", ContactController.updateContactStatus);

// Delete contact submission
router.delete("/:id", ContactController.deleteContact);

module.exports = router;