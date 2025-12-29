const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { database } = require('./config/database');

// Import routes
const employeeRoutes = require('./routes/employeeRoutes');
const jobPostingRoutes = require('./routes/jobPostingRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const offerRoutes = require('./routes/offerRoutes');
const negotiationRoutes = require('./routes/negotiationRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const trainingRoutes = require('./routes/trainingRoutes');
const complianceRoutes = require('./routes/complianceRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const noteRoutes = require('./routes/noteRoutes');
const customerRoutes = require('./routes/customerRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const customerOrderRoutes = require('./routes/customerOrderRoutes');
const supplierOrderRoutes = require('./routes/supplierOrderRoutes');
const ptoRoutes = require('./routes/pto');
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");



// const expenseRoutes = require("./routes/expenseRoutes");
// const payrollRoutes = require("./routes/payrollRoutes");



dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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
          setTimeout(() => reject(new Error('Connection timeout')), 5000)
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
      console.error('Database connection error:', error.message);
      dbConnectionPromise = null;
      throw error;
    });

  // Wait for connection with timeout
  try {
    await Promise.race([
      dbConnectionPromise,
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 5000)
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
    console.error('Database connection failed:', error.message);
    // Don't block - let the route handlers deal with it
    // But mark that connection failed
    if (error.message.includes('timeout') || error.message.includes('MONGO_URI')) {
      return res.status(503).json({
        error: 'Database unavailable',
        message: 'Unable to connect to database. Please check MONGO_URI environment variable.'
      });
    }
  }
  
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'HR Management System API is running',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// API Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/job-postings', jobPostingRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/negotiations', negotiationRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/products', productRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/customer-orders', customerOrderRoutes);
app.use('/api/supplier-orders', supplierOrderRoutes);
app.use('/api/pto', ptoRoutes);
// app.use('/api/timesheets', timesheetRoutes);
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/certifications', require('./routes/certifications'));
app.use('/api/overtime', require('./routes/overtime'));
app.use("/api/timesheets", require("./routes/timesheetsRoutes"));
app.use("/api/performance", require("./routes/performanceRoutes"));
app.use("/api/payroll", payrollRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/negotiations", negotiationRoutes);
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/auth", authRoutes);
app.use(
  "/api/employee-profile",
  require("./routes/employeeProfileRoutes")
);
app.use("/api/tasks", require("./routes/taskRoutes"));

app.use("/api/payments", paymentRoutes);
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutesforclient"));







// Dashboard stats endpoint
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const Employee = require('./models/Employee');
    const JobPosting = require('./models/JobPosting');
    const Candidate = require('./models/Candidate');
    const Attendance = require('./models/Attendance');
    const Expense = require('./models/Expense');

    // Get basic counts
    const totalEmployees = await Employee.countDocuments();
    const activeJobPostings = await JobPosting.countDocuments({ status: 'Active' });
    const totalCandidates = await Candidate.countDocuments();
    
    // Today's attendance
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayAttendance = await Attendance.countDocuments({ 
      date: today, 
      status: { $in: ['Present', 'Late'] } 
    });
    
    // Monthly expenses
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    const monthlyExpensesResult = await Expense.aggregate([
      {
        $match: {
          date: { $gte: currentMonth, $lt: nextMonth }
        }
      },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: '$amount' }
        }
      }
    ]);
    
    const monthlyExpenses = monthlyExpensesResult[0]?.totalExpenses || 0;

    res.json({
      totalEmployees,
      activeJobPostings,
      totalCandidates,
      todayAttendance,
      monthlyExpenses,
      attendanceRate: totalEmployees > 0 ? ((todayAttendance / totalEmployees) * 100).toFixed(1) : 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Only start server if not in Vercel serverless environment
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 HR Management System API running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  });
}

// Export for Vercel serverless functions
module.exports = app;