const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed'], default: 'Upcoming' },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  duration: { type: String, required: true },
  mode: { type: String, enum: ['Virtual', 'In-Person'], default: 'In-Person' },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  enrolled: { type: Number, default: 0 },
  prerequisites: [{ type: String }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Training', trainingSchema);