/**
 * Standardized response helper functions
 */
const { STATUS_CODES, MESSAGES } = require('../config/constants');

const sendResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

const sendSuccess = (res, data, message = MESSAGES.SUCCESS) => {
  return sendResponse(res, STATUS_CODES.SUCCESS, message, data);
};

const sendCreated = (res, data, message = MESSAGES.CREATED) => {
  return sendResponse(res, STATUS_CODES.CREATED, message, data);
};

const sendError = (res, statusCode, message) => {
  return sendResponse(res, statusCode, message);
};

const sendNotFound = (res, message = MESSAGES.NOT_FOUND) => {
  return sendError(res, STATUS_CODES.NOT_FOUND, message);
};

const sendBadRequest = (res, message = MESSAGES.INVALID_DATA) => {
  return sendError(res, STATUS_CODES.BAD_REQUEST, message);
};

const sendServerError = (res, message = MESSAGES.SERVER_ERROR) => {
  return sendError(res, STATUS_CODES.SERVER_ERROR, message);
};

module.exports = {
  sendResponse,
  sendSuccess,
  sendCreated,
  sendError,
  sendNotFound,
  sendBadRequest,
  sendServerError
};