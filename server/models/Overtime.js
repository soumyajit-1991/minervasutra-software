const mongoose = require('mongoose');

const overtimeSchema = new mongoose.Schema({
  employee: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  overtimeHours: { type: Number, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  approvedBy: { type: String },
  department: { type: String, default: 'Pharmacy Operations' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Overtime', overtimeSchema);