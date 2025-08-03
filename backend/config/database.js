const mongoose = require("mongoose");

/**
 * Database configuration and connection setup
 */
const connectDatabase = async () => {
  try {
    const DB_URI = process.env.DB_URI || "mongodb+srv://root:tauz001@bookbee.4xj0vww.mongodb.net/?retryWrites=true&w=majority&appName=BookBee";
    
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;