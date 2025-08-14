const User = require("../models/user");
const { sendSuccess, sendCreated, sendBadRequest, sendServerError } = require("../utils/responseHelper");

class AuthController {
  
  /**
   * User Registration
   */
  static async signup(req, res, next) {
    try {
      const { name, mobile, password, userType } = req.body;

      // Validate required fields
      if (!name || !mobile || !password) {
        return sendBadRequest(res, "Name, mobile, and password are required");
      }

      // Check if user already exists
      const existingUser = await User.findOne({ mobile });
      if (existingUser) {
        return sendBadRequest(res, "User with this mobile number already exists");
      }

      // Create new user
      const user = new User({
        name: name.trim(),
        mobile: mobile.trim(),
        password,
        userType: userType || "commuter"
      });

      const savedUser = await user.save();

      // Create session
      req.session.userId = savedUser._id;
      req.session.userType = savedUser.userType;

      sendCreated(res, savedUser, "Account created successfully");

    } catch (error) {
      if (error.code === 11000) {
        return sendBadRequest(res, "User with this mobile number already exists");
      }
      next(error);
    }
  }

  /**
   * User Login
   */
  static async login(req, res, next) {
    try {
      const { mobile, password } = req.body;

      // Validate required fields
      if (!mobile || !password) {
        return sendBadRequest(res, "Mobile number and password are required");
      }

      // Find user by mobile
      const user = await User.findOne({ mobile: mobile.trim(), isActive: true });
      if (!user) {
        return sendBadRequest(res, "Invalid mobile number or password");
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return sendBadRequest(res, "Invalid mobile number or password");
      }

      // Create session
      req.session.userId = user._id;
      req.session.userType = user.userType;

      sendSuccess(res, user, "Login successful");

    } catch (error) {
      next(error);
    }
  }

  /**
   * User Logout
   */
  static async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return sendServerError(res, "Could not log out");
        }
        
        res.clearCookie('connect.sid'); // Default session cookie name
        sendSuccess(res, null, "Logged out successfully");
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get current user profile
   */
  static async getProfile(req, res, next) {
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return sendBadRequest(res, "User not found");
      }

      sendSuccess(res, user, "Profile retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  /**
   * Check authentication status
   */
  static async checkAuth(req, res) {
    if (req.session.userId) {
      try {
        const user = await User.findById(req.session.userId);
        if (user) {
          return sendSuccess(res, user, "User is authenticated");
        }
      } catch (error) {
        // Continue to unauthenticated response
      }
    }
    
    sendSuccess(res, null, "User is not authenticated");
  }
}

module.exports = AuthController;