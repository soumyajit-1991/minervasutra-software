const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  noteId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    // required: true
  },
  content: {
    type: String,
    // required: true
  },
  category: {
    type: String,
    enum: ['General', 'Meeting', 'Task', 'Reminder', 'Policy', 'Announcement'],
    default: 'General'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  author: {
    type: String,
    // required: true
  },
  department: {
    type: String,
    // required: true
  },
  tags: [{
    type: String
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  sharedWith: [{
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    employeeName: String,
    permission: { type: String, enum: ['Read', 'Edit'], default: 'Read' }
  }],
  attachments: [{
    filename: String,
    url: String,
    size: String,
    uploadDate: { type: Date, default: Date.now }
  }],
  dueDate: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['Active', 'Archived', 'Draft'],
    default: 'Active'
  },
  comments: [{
    author: String,
    content: String,
    date: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);