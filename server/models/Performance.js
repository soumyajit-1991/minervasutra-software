// const mongoose = require('mongoose');

// const performanceSchema = new mongoose.Schema({
//   reviewId: {
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
//   department: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     required: true
//   },
//   reviewPeriod: {
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true }
//   },
//   reviewer: {
//     type: String,
//     required: true
//   },
//   reviewerRole: {
//     type: String,
//     required: true
//   },
//   rating: {
//     type: Number,
//     min: 0,
//     max: 5,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'In Progress', 'Completed', 'Overdue'],
//     default: 'Pending'
//   },
//   reviewDate: {
//     type: Date,
//     default: Date.now
//   },
//   goals: [{
//     title: String,
//     description: String,
//     status: { type: String, enum: ['Not Started', 'In Progress', 'Completed', 'Exceeded'] },
//     rating: { type: Number, min: 0, max: 5 }
//   }],
//   competencies: [{
//     name: String,
//     rating: { type: Number, min: 0, max: 5 },
//     comments: String
//   }],
//   achievements: [{
//     title: String,
//     description: String,
//     impact: String
//   }],
//   areasForImprovement: [{
//     area: String,
//     suggestions: String,
//     priority: { type: String, enum: ['Low', 'Medium', 'High'] }
//   }],
//   overallComments: {
//     type: String,
//     default: ''
//   },
//   employeeFeedback: {
//     type: String,
//     default: ''
//   },
//   nextReviewDate: {
//     type: Date,
//     required: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Performance', performanceSchema);


const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema(
  {
    employee: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewer: { type: String, required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Performance", performanceSchema);
