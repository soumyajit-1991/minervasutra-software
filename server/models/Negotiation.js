// const mongoose = require('mongoose');

// const negotiationSchema = new mongoose.Schema({
//   negotiationId: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   offerId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Offer',
//     required: true
//   },
//   candidateId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Candidate',
//     required: true
//   },
//   candidateName: {
//     type: String,
//     required: true
//   },
//   position: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['In Progress', 'Completed', 'Stalled', 'Cancelled'],
//     default: 'In Progress'
//   },
//   priority: {
//     type: String,
//     enum: ['Low', 'Medium', 'High', 'Critical'],
//     default: 'Medium'
//   },
//   assignedTo: {
//     type: String,
//     required: true
//   },
//   startDate: {
//     type: Date,
//     default: Date.now
//   },
//   expectedCloseDate: {
//     type: Date,
//     required: true
//   },
//   currentOffer: {
//     salary: String,
//     bonus: String,
//     benefits: [String]
//   },
//   candidateCounterOffer: {
//     salary: String,
//     bonus: String,
//     benefits: [String],
//     otherRequests: String
//   },
//   notes: [{
//     content: String,
//     author: String,
//     date: { type: Date, default: Date.now },
//     type: { type: String, enum: ['Note', 'Counter Offer', 'Decision', 'Meeting'] }
//   }],
//   timeline: [{
//     event: String,
//     date: { type: Date, default: Date.now },
//     details: String
//   }]
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Negotiation', negotiationSchema);



const mongoose = require("mongoose");

const negotiationSchema = new mongoose.Schema(
  {
    negotiationId: { type: String, unique: true },

    candidateName: { type: String, required: true },
    position: { type: String, required: true },

    originalOffer: { type: Number, required: true },
    counterOffer: { type: Number },
    finalOffer: { type: Number },

    benefits: { type: [String], default: [] },

    status: {
      type: String,
      enum: ["Active", "Approved", "Rejected"],
      default: "Active",
    },

    notes: [
      {
        content: String,
        author: String,
        date: { type: String },
      },
    ],

    documents: [
      {
        name: String,
        url: String,
      },
    ],

    approvedBy: String,
    approvalDate: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Negotiation", negotiationSchema);
