// const express = require('express');
// const router = express.Router();
// const {
//   getExpenses,
//   getExpenseById,
//   createExpense,
//   updateExpense,
//   deleteExpense,
//   getExpenseStats,
//   makePayment,
//   approveExpense
// } = require('../controllers/expenseController');

// // GET /api/expenses - Get all expenses
// router.get('/', getExpenses);

// // GET /api/expenses/stats - Get expense statistics
// router.get('/stats', getExpenseStats);

// // GET /api/expenses/:id - Get expense by ID
// router.get('/:id', getExpenseById);

// // POST /api/expenses - Create new expense
// router.post('/', createExpense);

// // PUT /api/expenses/:id - Update expense
// router.put('/:id', updateExpense);

// // POST /api/expenses/:id/payment - Make payment
// router.post('/:id/payment', makePayment);

// // POST /api/expenses/:id/approve - Approve expense
// router.post('/:id/approve', approveExpense);

// // DELETE /api/expenses/:id - Delete expense
// router.delete('/:id', deleteExpense);

// module.exports = router;
const express = require("express");
const router = express.Router();
const controller = require("../controllers/expenseController");

router.post("/", controller.createExpense);
router.get("/", controller.getExpenses);
router.get("/:id", controller.getExpenseById);
router.put("/:id", controller.updateExpense);
router.delete("/:id", controller.deleteExpense);

module.exports = router;

