// const mongoose = require('mongoose');

// const offerSchema = new mongoose.Schema({
//   offerId: {
//     type: String,
//     required: true,
//     unique: true
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
//   candidateAvatar: {
//     type: String,
//     default: ''
//   },
//   position: {
//     type: String,
//     required: true
//   },
//   department: {
//     type: String,
//     required: true
//   },
//   offerDate: {
//     type: Date,
//     default: Date.now
//   },
//   expiryDate: {
//     type: Date,
//     required: true
//   },
//   salary: {
//     type: String,
//     required: true
//   },
//   bonus: {
//     type: String,
//     default: '0'
//   },
//   startDate: {
//     type: Date,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Accepted', 'Declined', 'Withdrawn', 'Expired'],
//     default: 'Pending'
//   },
//   responseDeadline: {
//     type: Date,
//     required: true
//   },
//   benefits: [{
//     type: String
//   }],
//   recruiter: {
//     type: String,
//     required: true
//   },
//   notes: {
//     type: String,
//     default: ''
//   },
//   terms: {
//     probationPeriod: String,
//     noticePeriod: String,
//     workLocation: String,
//     workSchedule: String
//   },
//   negotiationHistory: [{
//     date: { type: Date, default: Date.now },
//     changes: String,
//     initiatedBy: String,
//     status: String
//   }]
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Offer', offerSchema);



const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  offerId: {
    type: String,
    // required: true,
    unique: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    // required: true
  },
  candidateName: {
    type: String,
    // required: true
  },
  candidateAvatar: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    // required: true
  },
  department: {
    type: String,
    // required: true
  },
  offerDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    // required: true
  },
  salary: {
    type: String,
    // required: true
  },
  bonus: {
    type: String,
    default: '0'
  },
  startDate: {
    type: Date,
    // required: true
  },
  responseDeadline: {
    type: Date,
    // required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Declined', 'Withdrawn', 'Expired'],
    default: 'Pending'
  },
  benefits: [{ type: String }],
  recruiter: {
    type: String,
    // required: true
  },
  notes: {
    type: String,
    default: ''
  },
  negotiationHistory: [{
    date: { type: Date, default: Date.now },
    changes: String,
    initiatedBy: String,
    status: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
