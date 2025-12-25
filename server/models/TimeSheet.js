// const mongoose = require('mongoose');

// const timeSheetSchema = new mongoose.Schema({
//   employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
//   employeeName: { type: String, required: true },
//   weekStartDate: { type: String, required: true },
//   weekEndDate: { type: String, required: true },
//   totalHours: { type: Number, default: 0 },
//   regularHours: { type: Number, default: 0 },
//   overtimeHours: { type: Number, default: 0 },
//   status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
//   weekData: [{
//     day: String,
//     date: String,
//     hours: Number,
//     overtime: Number,
//     status: { type: String, enum: ['Pending', 'Approved'], default: 'Pending' }
//   }],
//   approvedBy: { type: String },
//   approvalDate: { type: String }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('TimeSheet', timeSheetSchema);
const mongoose = require("mongoose");

const TimesheetSchema = new mongoose.Schema(
  {
    totalHours: {
      type: Number,
      required: true,
    },
    negotiationHours: {
      type: Number,
      default: 0,
    },
    billingType: {
      type: String,
      enum: ["month", "day"],
      required: true,
    },
    monthlyCharge: {
      type: Number,
    },
    dailyCharge: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Pending", "Pay"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timesheet", TimesheetSchema);
