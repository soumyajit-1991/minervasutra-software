//models/Employee.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  aadhaar: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{12}$/, 'Aadhaar must be a 12-digit number']
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
    trim: true
  },
  branch: {
    type: String,
    default: ""
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  hoursWorked: [{
    month: {
      type: String,
      required: true,
      trim: true
    },
    hours: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
EmployeeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Employee', EmployeeSchema);