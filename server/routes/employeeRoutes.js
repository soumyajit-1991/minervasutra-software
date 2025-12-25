// const express = require('express');
// const router = express.Router();
// const {
//   getEmployees,
//   getEmployeeById,
//   createEmployee,
//   updateEmployee,
//   deleteEmployee,
//   getEmployeeStats
// } = require('../controllers/employeeController');

// // GET /api/employees - Get all employees
// router.get('/', getEmployees);

// // GET /api/employees/stats - Get employee statistics
// router.get('/stats', getEmployeeStats);

// // GET /api/employees/:id - Get employee by ID
// router.get('/:id', getEmployeeById);

// // POST /api/employees - Create new employee
// router.post('/', createEmployee);

// // PUT /api/employees/:id - Update employee
// router.put('/:id', updateEmployee);

// // DELETE /api/employees/:id - Delete employee
// router.delete('/:id', deleteEmployee);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
} = require("../controllers/employeeController");

router.post("/", createEmployee);
router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.get("/stats/summary", getEmployeeStats);

module.exports = router;

