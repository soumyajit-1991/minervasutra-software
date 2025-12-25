const mongoose = require('mongoose');

const ptoSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  employeeName: { type: String, required: true },
  type: { type: String, enum: ['Vacation', 'Sick Leave', 'Personal', 'Emergency'], required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  days: { type: Number, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  requestedDate: { type: String, required: true },
  approvedBy: { type: String },
  approvalDate: { type: String },
  rejectionReason: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('PTO', ptoSchema);