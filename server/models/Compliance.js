const mongoose = require('mongoose');

const complianceSchema = new mongoose.Schema({
  complianceId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Regulatory', 'Safety', 'Licensing', 'Operations', 'Financial'],
    required: true
  },
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Bi-Annual', 'Annual'],
    required: true
  },
  lastAuditDate: {
    type: Date,
    required: true
  },
  nextDueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Compliant', 'Pending', 'Non-Compliant', 'Under Review'],
    default: 'Pending'
  },
  complianceRate: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  assignee: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  requirements: [{
    requirement: String,
    status: { type: String, enum: ['Met', 'Pending', 'Not Met'] },
    evidence: String,
    lastChecked: Date
  }],
  auditHistory: [{
    date: { type: Date, default: Date.now },
    auditor: String,
    result: { type: String, enum: ['Pass', 'Fail', 'Conditional Pass'] },
    findings: String,
    recommendations: String
  }],
  documents: [{
    name: String,
    url: String,
    uploadDate: { type: Date, default: Date.now },
    expiryDate: Date
  }],
  reminders: [{
    type: { type: String, enum: ['Email', 'System', 'SMS'] },
    scheduledDate: Date,
    sent: { type: Boolean, default: false }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Compliance', complianceSchema);