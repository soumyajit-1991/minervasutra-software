// config/database.js
// Simple Mongo connection helper using CommonJS to match the rest of the server.
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const database = {
  connect: async () => {
    try {
      // Check if already connected
      if (mongoose.connection.readyState === 1) {
        console.log("✅ DB Already Connected");
        return;
      }

      if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI environment variable is not set");
      }

      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // 5 second timeout
        socketTimeoutMS: 45000,
        connectTimeoutMS: 5000,
        maxPoolSize: 1, // Important for serverless - reuse connection
      });
      console.log("✅ DB Connected Successfully");
    } catch (error) {
      console.error("❌ DB Connection Failed:", error);
      // Don't exit in serverless - let the function handle the error
      if (process.env.VERCEL !== "1") {
        process.exit(1);
      }
      throw error;
    }
  },
};

module.exports = { database };