const { sendBadRequest } = require("../utils/responseHelper");

/**
 * Middleware to check if user is authenticated
 */
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return sendBadRequest(res, "Authentication required");
  }
  next();
};

/**
 * Middleware to check if user is a host
 */
const requireHost = (req, res, next) => {
  if (!req.session.userId) {
    return sendBadRequest(res, "Authentication required");
  }
  
  if (req.session.userType !== 'host') {
    return sendBadRequest(res, "Host access required");
  }
  
  next();
};

/**
 * Middleware to optionally check authentication (doesn't block if not authenticated)
 */
const optionalAuth = (req, res, next) => {
  // Just continue - session data will be available if user is logged in
  next();
};

module.exports = {
  requireAuth,
  requireHost,
  optionalAuth
};