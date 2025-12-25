// const express = require('express');
// const router = express.Router();
// const {
//   getPayrolls,
//   getPayrollById,
//   createPayroll,
//   updatePayroll,
//   deletePayroll,
//   getPayrollStats,
//   processPayroll,
//   generatePayrollForAll
// } = require('../controllers/payrollController');

// // GET /api/payroll - Get all payroll records
// router.get('/', getPayrolls);

// // GET /api/payroll/stats - Get payroll statistics
// router.get('/stats', getPayrollStats);

// // GET /api/payroll/:id - Get payroll by ID
// router.get('/:id', getPayrollById);

// // POST /api/payroll - Create payroll record
// router.post('/', createPayroll);

// // POST /api/payroll/generate-all - Generate payroll for all employees
// router.post('/generate-all', generatePayrollForAll);

// // POST /api/payroll/process - Process multiple payroll records
// router.post('/process', processPayroll);

// // PUT /api/payroll/:id - Update payroll record
// router.put('/:id', updatePayroll);

// // DELETE /api/payroll/:id - Delete payroll record
// router.delete('/:id', deletePayroll);

// module.exports = router;



const express = require("express");
const router = express.Router();
const Payroll = require("../models/Payroll");

/* ===== GET ALL PAYROLL RECORDS ===== */
router.get("/", async (req, res) => {
  try {
    const records = await Payroll.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===== CREATE PAYROLL ===== */
router.post("/", async (req, res) => {
  try {
    const count = await Payroll.countDocuments();
    const payrollId = `PAY-${String(count + 1).padStart(3, "0")}`;

    const payroll = new Payroll({
      payrollId,
      employeeId: req.body.employeeId,
      employeeName: req.body.employeeName,
      role: req.body.role,
      salary: req.body.salary,
      date: req.body.date,
      status: req.body.status || "Pending",
    });

    await payroll.save();
    res.status(201).json(payroll);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
