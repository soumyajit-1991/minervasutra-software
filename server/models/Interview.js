// const mongoose = require('mongoose');

// const interviewSchema = new mongoose.Schema({
//   interviewId: {
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
//   interviewType: {
//     type: String,
//     enum: ['Phone Screening', 'Technical Interview', 'Panel Interview', 'Final Interview', 'HR Round'],
//     required: true
//   },
//   date: {
//     type: Date,
//     required: true
//   },
//   time: {
//     type: String,
//     required: true
//   },
//   duration: {
//     type: String,
//     required: true
//   },
//   interviewer: {
//     type: String,
//     required: true
//   },
//   interviewerAvatar: {
//     type: String,
//     default: ''
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'],
//     default: 'Scheduled'
//   },
//   mode: {
//     type: String,
//     enum: ['In-Person', 'Virtual', 'Phone'],
//     required: true
//   },
//   notes: {
//     type: String,
//     default: ''
//   },
//   feedback: {
//     rating: { type: Number, min: 0, max: 5 },
//     comments: String,
//     recommendation: { type: String, enum: ['Proceed', 'Reject', 'On Hold'] }
//   },
//   meetingLink: {
//     type: String,
//     default: ''
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Interview', interviewSchema);


const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  interviewId: {
    type: String,
    required: true,
    unique: true
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  candidateAvatar: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    required: true
  },
  interviewType: {
    type: String,
    enum: [
      'Phone Screening',
      'Technical Interview',
      'Panel Interview',
      'Final Interview',
      'HR Round'
    ],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  interviewer: {
    type: String,
    required: true
  },
  interviewerAvatar: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'],
    default: 'Scheduled'
  },
  mode: {
    type: String,
    enum: ['In-Person', 'Virtual', 'Phone'],
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  feedback: {
    rating: { type: Number, min: 0, max: 5 },
    comments: String,
    recommendation: { type: String, enum: ['Proceed', 'Reject', 'On Hold'] }
  },
  meetingLink: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Interview', interviewSchema);
