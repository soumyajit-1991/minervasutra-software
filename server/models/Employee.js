const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: {
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
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
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
 status: {
  type: String,
  enum: ["Active", "Probation", "Notice Period"],
  default: "Active",
},

  avatarUrl: {
    type: String,
    default: ''
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  manager: {
    type: String,
    default: ''
  },
  salary: {
    type: Number,
    required: true
  },
  about: {
    type: String,
    default: ''
  },
  personalInfo: {
    dob: Date,
    nationality: String,
    maritalStatus: String,
    gender: String,
    address: String
  },
  skills: [{
    type: String
  }],
  experience: [{
    role: String,
    company: String,
    duration: String,
    description: String
  }],
  documents: [{
    name: String,
    size: String,
    date: String
  }],
  attendance: {
    totalDays: { type: Number, default: 0 },
    presentDays: { type: Number, default: 0 },
    absentDays: { type: Number, default: 0 },
    lateDays: { type: Number, default: 0 }
  },
  performance: {
    rating: { type: Number, default: 0 },
    lastReviewDate: Date,
    reviewer: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);