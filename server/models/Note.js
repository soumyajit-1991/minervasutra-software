//models/Note.js
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Note', NoteSchema);