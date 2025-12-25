const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  candidateId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    required: true
  },
  jobPostingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting'
  },
  stage: {
    type: String,
    enum: ['Screening', 'Phone Interview', 'Technical Interview', 'Final Interview', 'Offer', 'Rejected', 'Hired'],
    default: 'Screening'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  experience: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  status: {
    type: String,
    enum: ['Active', 'Closed', 'On Hold'],
    default: 'Active'
  },
  nextStep: {
    type: String,
    default: ''
  },
  recruiter: {
    type: String,
    required: true
  },
  resume: {
    filename: String,
    url: String,
    uploadDate: Date
  },
  notes: [{
    content: String,
    author: String,
    date: { type: Date, default: Date.now }
  }],
  skills: [{
    type: String
  }],
  education: [{
    degree: String,
    institution: String,
    year: String
  }],
  workExperience: [{
    company: String,
    role: String,
    duration: String,
    description: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Candidate', candidateSchema);