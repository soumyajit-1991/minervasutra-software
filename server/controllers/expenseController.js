// const Expense = require('../models/Expense');

// // Get all expenses
// const getExpenses = async (req, res) => {
//   try {
//     const { category, status, department, startDate, endDate } = req.query;
//     let filter = {};
    
//     if (category) filter.category = category;
//     if (status) filter.status = status;
//     if (department) filter.department = department;
//     if (startDate && endDate) {
//       filter.date = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate)
//       };
//     }
    
//     const expenses = await Expense.find(filter).sort({ date: -1 });
//     res.json(expenses);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get expense by ID
// const getExpenseById = async (req, res) => {
//   try {
//     const expense = await Expense.findById(req.params.id);
//     if (!expense) {
//       return res.status(404).json({ error: 'Expense not found' });
//     }
//     res.json(expense);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Create new expense
// const createExpense = async (req, res) => {
//   try {
//     // Generate expense ID
//     const count = await Expense.countDocuments();
//     const expenseId = `EXP-${String(count + 1).padStart(3, '0')}`;
    
//     // Calculate due amount
//     const dueAmount = req.body.amount - (req.body.paidAmount || 0);
    
//     const expense = new Expense({
//       ...req.body,
//       expenseId,
//       dueAmount
//     });
    
//     const savedExpense = await expense.save();
//     res.status(201).json(savedExpense);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Update expense
// const updateExpense = async (req, res) => {
//   try {
//     // Recalculate due amount if amount or paidAmount changed
//     if (req.body.amount !== undefined || req.body.paidAmount !== undefined) {
//       const expense = await Expense.findById(req.params.id);
//       if (!expense) {
//         return res.status(404).json({ error: 'Expense not found' });
//       }
      
//       const amount = req.body.amount !== undefined ? req.body.amount : expense.amount;
//       const paidAmount = req.body.paidAmount !== undefined ? req.body.paidAmount : expense.paidAmount;
      
//       req.body.dueAmount = amount - paidAmount;
      
//       // Update status based on payment
//       if (req.body.dueAmount <= 0) {
//         req.body.status = 'Paid';
//       } else if (paidAmount > 0) {
//         req.body.status = 'Partial';
//       }
//     }
    
//     const expense = await Expense.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
    
//     if (!expense) {
//       return res.status(404).json({ error: 'Expense not found' });
//     }
    
//     res.json(expense);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Delete expense
// const deleteExpense = async (req, res) => {
//   try {
//     const expense = await Expense.findByIdAndDelete(req.params.id);
//     if (!expense) {
//       return res.status(404).json({ error: 'Expense not found' });
//     }
//     res.json({ message: 'Expense deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get expense statistics
// const getExpenseStats = async (req, res) => {
//   try {
//     const currentMonth = new Date();
//     currentMonth.setDate(1);
//     currentMonth.setHours(0, 0, 0, 0);
    
//     const nextMonth = new Date(currentMonth);
//     nextMonth.setMonth(nextMonth.getMonth() + 1);
    
//     // Current month expenses
//     const monthlyExpenses = await Expense.aggregate([
//       {
//         $match: {
//           date: { $gte: currentMonth, $lt: nextMonth }
//         }
//       },
//       {
//         $group: {
//           _id: null,
//           totalExpenses: { $sum: '$amount' },
//           totalPaid: { $sum: '$paidAmount' },
//           totalDue: { $sum: '$dueAmount' }
//         }
//       }
//     ]);
    
//     const monthlyStats = monthlyExpenses[0] || { totalExpenses: 0, totalPaid: 0, totalDue: 0 };
    
//     // Status breakdown
//     const pending = await Expense.countDocuments({ status: 'Pending' });
//     const partial = await Expense.countDocuments({ status: 'Partial' });
//     const paid = await Expense.countDocuments({ status: 'Paid' });
//     const overdue = await Expense.countDocuments({ 
//       status: { $in: ['Pending', 'Partial'] },
//       dueDate: { $lt: new Date() }
//     });
    
//     // Category breakdown
//     const categoryStats = await Expense.aggregate([
//       {
//         $match: {
//           date: { $gte: currentMonth, $lt: nextMonth }
//         }
//       },
//       {
//         $group: {
//           _id: '$category',
//           amount: { $sum: '$amount' },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { amount: -1 } }
//     ]);
    
//     // Department breakdown
//     const departmentStats = await Expense.aggregate([
//       {
//         $match: {
//           date: { $gte: currentMonth, $lt: nextMonth }
//         }
//       },
//       {
//         $group: {
//           _id: '$department',
//           amount: { $sum: '$amount' },
//           count: { $sum: 1 }
//         }
//       },
//       { $sort: { amount: -1 } }
//     ]);
    
//     // Monthly budget (assuming 60000 as default)
//     const monthlyBudget = 60000;
//     const remainingBudget = Math.max(0, monthlyBudget - monthlyStats.totalExpenses);
    
//     res.json({
//       totalExpenses: monthlyStats.totalExpenses,
//       monthlyBudget,
//       remainingBudget,
//       pendingPayments: pending,
//       totalPaid: monthlyStats.totalPaid,
//       totalDue: monthlyStats.totalDue,
//       statusBreakdown: { pending, partial, paid, overdue },
//       categoryStats,
//       departmentStats
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Make payment
// const makePayment = async (req, res) => {
//   try {
//     const { paymentAmount, paymentMethod, notes } = req.body;
    
//     const expense = await Expense.findById(req.params.id);
//     if (!expense) {
//       return res.status(404).json({ error: 'Expense not found' });
//     }
    
//     const newPaidAmount = expense.paidAmount + paymentAmount;
//     const newDueAmount = expense.amount - newPaidAmount;
    
//     let newStatus = expense.status;
//     if (newDueAmount <= 0) {
//       newStatus = 'Paid';
//     } else if (newPaidAmount > 0) {
//       newStatus = 'Partial';
//     }
    
//     const updatedExpense = await Expense.findByIdAndUpdate(
//       req.params.id,
//       {
//         paidAmount: newPaidAmount,
//         dueAmount: Math.max(0, newDueAmount),
//         status: newStatus,
//         paymentMethod: paymentMethod || expense.paymentMethod,
//         notes: notes || expense.notes
//       },
//       { new: true, runValidators: true }
//     );
    
//     res.json(updatedExpense);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Approve expense
// const approveExpense = async (req, res) => {
//   try {
//     const { approvedBy } = req.body;
    
//     const expense = await Expense.findByIdAndUpdate(
//       req.params.id,
//       {
//         approvedBy,
//         approvalDate: new Date(),
//         status: expense.status === 'Pending' ? 'Pending' : expense.status
//       },
//       { new: true, runValidators: true }
//     );
    
//     if (!expense) {
//       return res.status(404).json({ error: 'Expense not found' });
//     }
    
//     res.json(expense);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = {
//   getExpenses,
//   getExpenseById,
//   createExpense,
//   updateExpense,
//   deleteExpense,
//   getExpenseStats,
//   makePayment,
//   approveExpense
// };
const Expense = require("../models/Expense");
const crypto = require("crypto");

const generateExpenseId = () =>
  "EXP-" + crypto.randomBytes(4).toString("hex").toUpperCase();

/**
 * =========================
 * CREATE EXPENSE
 * =========================
 */
exports.createExpense = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const {
      description,
      department,
      amount,
      paidAmount = 0,
      dueDate,
      status = "Pending",
      paymentMethod = "Bank Transfer",
      notes = "",
    } = req.body;

    // ✅ REQUIRED FIELD VALIDATION (MATCHES FRONTEND)
    if (
      !description ||
      !department ||
      amount === undefined ||
      !dueDate
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const totalAmount = Number(amount);
    const paid = Number(paidAmount);

    if (isNaN(totalAmount) || isNaN(paid)) {
      return res.status(400).json({
        message: "Amount values must be numbers",
      });
    }

    const dueAmount = Math.max(0, totalAmount - paid);

    // ✅ AUTO STATUS LOGIC
    let finalStatus = status;
    if (dueAmount <= 0) finalStatus = "Paid";
    else if (paid > 0) finalStatus = "Partial";
    else finalStatus = "Pending";

    const expense = new Expense({
      expenseId: generateExpenseId(),
      description: description.trim(),
      department: department.trim(),
      amount: totalAmount,
      paidAmount: paid,
      dueAmount,
      dueDate,
      status: finalStatus,
      paymentMethod,
      notes,
    });

    await expense.save();

    res.status(201).json(expense);
  } catch (err) {
    console.error("CREATE EXPENSE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * =========================
 * GET ALL EXPENSES
 * =========================
 */
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * =========================
 * GET ONE EXPENSE
 * =========================
 */
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({ expenseId: req.params.id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * =========================
 * UPDATE EXPENSE
 * =========================
 */
exports.updateExpense = async (req, res) => {
  try {
    if (req.body.amount !== undefined || req.body.paidAmount !== undefined) {
      const amount = Number(req.body.amount);
      const paid = Number(req.body.paidAmount || 0);

      req.body.amount = amount;
      req.body.paidAmount = paid;
      req.body.dueAmount = Math.max(0, amount - paid);

      if (req.body.dueAmount <= 0) req.body.status = "Paid";
      else if (paid > 0) req.body.status = "Partial";
      else req.body.status = "Pending";
    }

    const updated = await Expense.findOneAndUpdate(
      { expenseId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * =========================
 * DELETE EXPENSE
 * =========================
 */
exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      expenseId: req.params.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
