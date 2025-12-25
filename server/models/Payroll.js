// const mongoose = require('mongoose');

// const payrollSchema = new mongoose.Schema({
//   payrollId: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   employeeId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Employee',
//     required: true
//   },
//   employeeName: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     required: true
//   },
//   department: {
//     type: String,
//     required: true
//   },
//   payPeriod: {
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true }
//   },
//   baseSalary: {
//     type: Number,
//     required: true
//   },
//   overtime: {
//     hours: { type: Number, default: 0 },
//     rate: { type: Number, default: 0 },
//     amount: { type: Number, default: 0 }
//   },
//   bonuses: {
//     type: Number,
//     default: 0
//   },
//   deductions: {
//     tax: { type: Number, default: 0 },
//     insurance: { type: Number, default: 0 },
//     other: { type: Number, default: 0 }
//   },
//   grossPay: {
//     type: Number,
//     required: true
//   },
//   netPay: {
//     type: Number,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Processing', 'Paid', 'Failed'],
//     default: 'Pending'
//   },
//   paymentDate: {
//     type: Date,
//     default: null
//   },
//   paymentMethod: {
//     type: String,
//     enum: ['Direct Deposit', 'Check', 'Cash'],
//     default: 'Direct Deposit'
//   },
//   notes: {
//     type: String,
//     default: ''
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Payroll', payrollSchema);
const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
  {
    payrollId: { type: String, required: true },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    employeeName: { type: String, required: true },
    role: { type: String, required: true },
    salary: { type: Number, required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payroll", payrollSchema);

