// Update backend/app.js - Fix CORS configuration
const express = require("express");
const cors = require("cors");
const session = require("express-session");

// Local modules
const connectDatabase = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const tripRoutes = require("./routes/tripRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authRoutes = require("./routes/authRoutes");
const { PORT, CORS_ORIGIN } = require("./config/constants");

const app = express();

// Database connection
connectDatabase();

// Session configuration MUST be before CORS
app.use(session({
  name: 'bookbee-session', // ADD THIS - explicit cookie name
  secret: process.env.SESSION_SECRET || 'bookbee-session-secret-key-make-it-very-long-and-random',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true only in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  }
}));

// UPDATED CORS Configuration - THIS IS CRUCIAL
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000'
    ];
    
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  credentials: true, // VERY IMPORTANT for sessions
  optionsSuccessStatus: 200 // For legacy browser support
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BookBee API is running",
    timestamp: new Date().toISOString(),
    cors: "enabled"
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, '0.0.0.0', () => { // Bind to all interfaces
  console.log(`🚀 BookBee server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 CORS enabled for frontend`);
});

module.exports = app;