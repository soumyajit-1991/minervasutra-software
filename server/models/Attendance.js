const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  employeeName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  checkIn: {
    type: String,
    default: null
  },
  checkOut: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late', 'On Leave', 'Half Day'],
    required: true
  },
  hoursWorked: {
    type: Number,
    default: 0
  },
  department: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  leaveType: {
    type: String,
    enum: ['Sick Leave', 'Casual Leave', 'Paid Leave', 'Unpaid Leave', 'Emergency Leave'],
    default: null
  },
  approvedBy: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Compound index for employee and date
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);