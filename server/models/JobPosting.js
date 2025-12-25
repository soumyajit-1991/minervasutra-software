// const mongoose = require('mongoose');

// const jobPostingSchema = new mongoose.Schema({
//   jobId: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   department: {
//     type: String,
//     required: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
//     required: true
//   },
//   postedDate: {
//     type: Date,
//     default: Date.now
//   },
//   closingDate: {
//     type: Date,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['Active', 'Draft', 'Closed', 'On Hold'],
//     default: 'Draft'
//   },
//   applicants: {
//     type: Number,
//     default: 0
//   },
//   salary: {
//     type: String,
//     required: true
//   },
//   experience: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   requirements: [{
//     type: String
//   }],
//   benefits: [{
//     type: String
//   }],
//   priority: {
//     type: String,
//     enum: ['Low', 'Medium', 'High', 'Critical'],
//     default: 'Medium'
//   },
//   hiringManager: {
//     type: String,
//     required: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('JobPosting', jobPostingSchema);




const mongoose = require('mongoose');

const jobPostingSchema = new mongoose.Schema({
  jobId: {
    type: String,
    // required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    required: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  },
  closingDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Draft', 'Closed', 'On Hold'],
    default: 'Draft'
  },
  applicants: {
    type: Number,
    default: 0
  },
  salary: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{ type: String }],
  benefits: [{ type: String }],
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  hiringManager: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('JobPosting', jobPostingSchema);
