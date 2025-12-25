const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');

// Get all payroll records
const getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find()
      .populate('employeeId', 'name role department')
      .sort({ createdAt: -1 });
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get payroll by ID
const getPayrollById = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id)
      .populate('employeeId', 'name role department');
    if (!payroll) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create payroll record
const createPayroll = async (req, res) => {
  try {
    const count = await Payroll.countDocuments();
    const payrollId = `PAY-${String(count + 1).padStart(3, "0")}`;

    const payroll = new Payroll({
      payrollId,
      employeeId: req.body.employeeId,
      employeeName: req.body.employee,
      role: req.body.role,
      salary: req.body.salary,
      date: req.body.date,
      status: req.body.status || "Pending",
      actionId: req.body.actionId,
    });

    const saved = await payroll.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Payroll create error:", error);
    res.status(400).json({ error: error.message });
  }
};


// Update payroll record
const updatePayroll = async (req, res) => {
  try {
    // Recalculate if salary components changed
    if (req.body.baseSalary || req.body.overtime || req.body.bonuses || req.body.deductions) {
      const payroll = await Payroll.findById(req.params.id);
      if (!payroll) {
        return res.status(404).json({ error: 'Payroll record not found' });
      }
      
      const baseSalary = req.body.baseSalary || payroll.baseSalary;
      const overtime = req.body.overtime || payroll.overtime;
      const bonuses = req.body.bonuses || payroll.bonuses;
      const deductions = req.body.deductions || payroll.deductions;
      
      const overtimeAmount = (overtime?.hours || 0) * (overtime?.rate || 0);
      const totalDeductions = (deductions?.tax || 0) + (deductions?.insurance || 0) + (deductions?.other || 0);
      
      req.body.grossPay = baseSalary + overtimeAmount + bonuses;
      req.body.netPay = req.body.grossPay - totalDeductions;
      
      if (req.body.overtime) {
        req.body.overtime.amount = overtimeAmount;
      }
    }
    
    const payroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('employeeId', 'name role department');
    
    if (!payroll) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(payroll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete payroll record
const deletePayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findByIdAndDelete(req.params.id);
    if (!payroll) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    res.json({ message: 'Payroll record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get payroll statistics
const getPayrollStats = async (req, res) => {
  try {
    const totalPayroll = await Payroll.aggregate([
      { $group: { _id: null, total: { $sum: '$netPay' } } }
    ]);
    
    const pendingPayments = await Payroll.countDocuments({ status: 'Pending' });
    const processed = await Payroll.countDocuments({ status: 'Paid' });
    const processing = await Payroll.countDocuments({ status: 'Processing' });
    
    const avgSalary = await Payroll.aggregate([
      { $group: { _id: null, avg: { $avg: '$netPay' } } }
    ]);
    
    res.json({
      totalPayroll: totalPayroll[0]?.total || 0,
      pendingPayments,
      processed,
      processing,
      avgSalary: avgSalary[0]?.avg || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Process payroll
const processPayroll = async (req, res) => {
  try {
    const { payrollIds } = req.body;
    
    const result = await Payroll.updateMany(
      { _id: { $in: payrollIds } },
      { 
        status: 'Processing',
        paymentDate: new Date()
      }
    );
    
    res.json({ 
      message: `${result.modifiedCount} payroll records updated to processing status`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Generate payroll for all employees
const generatePayrollForAll = async (req, res) => {
  try {
    const { payPeriod } = req.body;
    
    const employees = await Employee.find({ status: 'Active' });
    const payrollRecords = [];
    
    for (const employee of employees) {
      const count = await Payroll.countDocuments();
      const payrollId = `PAY-${String(count + payrollRecords.length + 1).padStart(3, '0')}`;
      
      // Basic calculation - in real app, this would be more complex
      const baseSalary = employee.salary || 0;
      const grossPay = baseSalary;
      const tax = grossPay * 0.1; // 10% tax
      const netPay = grossPay - tax;
      
      const payroll = new Payroll({
        payrollId,
        employeeId: employee._id,
        employeeName: employee.name,
        role: employee.role,
        department: employee.department,
        payPeriod,
        baseSalary,
        grossPay,
        netPay,
        deductions: { tax },
        status: 'Pending'
      });
      
      payrollRecords.push(payroll);
    }
    
    const savedPayrolls = await Payroll.insertMany(payrollRecords);
    res.status(201).json({
      message: `Generated payroll for ${savedPayrolls.length} employees`,
      payrolls: savedPayrolls
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPayrolls,
  getPayrollById,
  createPayroll,
  updatePayroll,
  deletePayroll,
  getPayrollStats,
  processPayroll,
  generatePayrollForAll
};