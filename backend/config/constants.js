/**
 * Application constants and configuration
 */
module.exports = {
  PORT: process.env.PORT || 3000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  
  // HTTP Status Codes
  STATUS_CODES: {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  },
  
  // Response Messages
  MESSAGES: {
    SUCCESS: "Operation successful",
    CREATED: "Resource created successfully",
    NOT_FOUND: "Resource not found",
    SERVER_ERROR: "Internal server error",
    INVALID_DATA: "Invalid or incomplete data provided",
  }
};