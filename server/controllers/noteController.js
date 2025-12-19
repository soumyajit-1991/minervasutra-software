//controllers/noteController.js
const Note = require('../models/Note.js');

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching note', error: error.message });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { content } = req.body;

    // Validate required fields
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const note = new Note({
      content
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { content } = req.body;

    const updateData = {};
    if (content) updateData.content = content;

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
};