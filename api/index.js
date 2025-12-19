// Vercel serverless function wrapper for Express app
// Using serverless-http for better compatibility
const serverless = require("serverless-http");

let app;
let handler;

try {
  // Load the Express app
  app = require("../server/index.js");
  
  // Create serverless handler
  handler = serverless(app, {
    binary: ['image/*', 'application/pdf', 'application/octet-stream']
  });
  
  console.log("✅ Serverless handler initialized");
} catch (error) {
  console.error("❌ Failed to initialize serverless handler:", error);
  // Return a basic error handler
  handler = async (req, res) => {
    res.status(500).json({ 
      error: "Server initialization failed",
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  };
}

// Export the handler
module.exports = handler;
