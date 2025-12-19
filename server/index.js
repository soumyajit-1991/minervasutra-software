// index.js
// Express entrypoint using CommonJS for consistency.
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { database } = require("./config/database");
const customerRoutes = require("./routes/customerRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");
const customerOrderRoutes = require("./routes/customerOrderRoutes");
const supplierOrderRoutes = require("./routes/supplierOrderRoutes");
const noteRoutes = require("./routes/noteRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const complianceRoutes = require("./routes/complianceRoutes");
const jobPostingRoutes = require("./routes/jobPostingRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// MongoDB Connection - handle gracefully for serverless
let dbConnectionPromise = null;
let dbConnected = false;

const connectDB = async () => {
  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    dbConnected = true;
    return;
  }

  // If connection is in progress, wait for it (with timeout)
  if (dbConnectionPromise) {
    try {
      await Promise.race([
        dbConnectionPromise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Connection timeout")), 5000)
        )
      ]);
      dbConnected = true;
      return;
    } catch (error) {
      dbConnectionPromise = null; // Reset on error
      throw error;
    }
  }

  // Start new connection
  dbConnectionPromise = database.connect()
    .then(() => {
      dbConnected = true;
      dbConnectionPromise = null;
    })
    .catch((error) => {
      console.error("Database connection error:", error.message);
      dbConnectionPromise = null;
      throw error;
    });

  // Wait for connection with timeout
  try {
    await Promise.race([
      dbConnectionPromise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Connection timeout")), 5000)
      )
    ]);
  } catch (error) {
    dbConnectionPromise = null;
    throw error;
  }
};

// Connect on first request in serverless (non-blocking after first attempt)
app.use(async (req, res, next) => {
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  // Try to connect (with timeout protection)
  try {
    await connectDB();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    // Don't block - let the route handlers deal with it
    // But mark that connection failed
    if (error.message.includes("timeout") || error.message.includes("MONGO_URI")) {
      return res.status(503).json({
        error: "Database unavailable",
        message: "Unable to connect to database. Please check MONGO_URI environment variable."
      });
    }
  }
  
  next();
});

// Routes
app.use("/api/customers", customerRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customer-orders", customerOrderRoutes);
app.use("/api/supplier-orders", supplierOrderRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/compliance", complianceRoutes);
app.use("/api/job-postings", jobPostingRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/interviews", require("./routes/interviewRoutes"));
app.use("/api/offers", require("./routes/offerRoutes"));
app.use("/api/negotiations", require("./routes/negotiationRoutes"));

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Only start server if not in Vercel serverless environment
if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// Export for Vercel serverless functions
module.exports = app;