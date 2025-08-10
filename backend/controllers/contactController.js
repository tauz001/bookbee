const Contact = require("../models/contact");
const { sendSuccess, sendCreated, sendNotFound, sendBadRequest } = require("../utils/responseHelper");

/**
 * Contact Controller - Handles contact form operations
 */
class ContactController {
  
  /**
   * Submit contact form
   */
  static async submitContactForm(req, res, next) {
    try {
      const { firstName, lastName, email, subject, message } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !subject || !message) {
        return sendBadRequest(res, "All fields are required");
      }

      // Create contact entry
      const contact = new Contact({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim()
      });

      const savedContact = await contact.save();
      sendCreated(res, savedContact, "Contact form submitted successfully");

    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all contact submissions (for admin)
   */
  static async getAllContacts(req, res, next) {
    try {
      const { status, page = 1, limit = 20 } = req.query;
      
      const filter = status ? { status } : {};
      const skip = (page - 1) * limit;
      
      const contacts = await Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Contact.countDocuments(filter);

      sendSuccess(res, {
        contacts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }, "Contact submissions retrieved successfully");
      
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get contact by ID
   */
  static async getContactById(req, res, next) {
    try {
      const { id } = req.params;
      
      const contact = await Contact.findById(id);
      
      if (!contact) {
        return sendNotFound(res, "Contact submission not found");
      }

      sendSuccess(res, contact, "Contact submission retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update contact status
   */
  static async updateContactStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["pending", "reviewed", "responded"].includes(status)) {
        return sendBadRequest(res, "Invalid status value");
      }

      const contact = await Contact.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!contact) {
        return sendNotFound(res, "Contact submission not found");
      }

      sendSuccess(res, contact, "Contact status updated successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete contact submission
   */
  static async deleteContact(req, res, next) {
    try {
      const { id } = req.params;
      
      const contact = await Contact.findByIdAndDelete(id);

      if (!contact) {
        return sendNotFound(res, "Contact submission not found");
      }

      sendSuccess(res, null, "Contact submission deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ContactController;