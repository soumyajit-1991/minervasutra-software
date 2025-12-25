const express = require('express');
const router = express.Router();
const {
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceStats,
  markAttendance
} = require('../controllers/attendanceController');

// GET /api/attendance - Get all attendance records
router.get('/', getAttendance);

// GET /api/attendance/stats - Get attendance statistics
router.get('/stats', getAttendanceStats);

// POST /api/attendance - Create attendance record
router.post('/', createAttendance);

// POST /api/attendance/mark - Mark attendance for employee
router.post('/mark', markAttendance);

// PUT /api/attendance/:id - Update attendance record
router.put('/:id', updateAttendance);

// DELETE /api/attendance/:id - Delete attendance record
router.delete('/:id', deleteAttendance);

module.exports = router;