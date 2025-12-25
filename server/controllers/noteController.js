const Note = require('../models/Note');

// Get all notes
const getNotes = async (req, res) => {
  try {
    const { category, priority, author, department, isPublic } = req.query;
    let filter = {};
    
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (author) filter.author = author;
    if (department) filter.department = department;
    if (isPublic !== undefined) filter.isPublic = isPublic === 'true';
    
    const notes = await Note.find(filter)
      .populate('sharedWith.employeeId', 'name email')
      .sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get note by ID
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('sharedWith.employeeId', 'name email');
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new note
const createNote = async (req, res) => {
  try {
    // Generate note ID
    const count = await Note.countDocuments();
    const noteId = `NOTE-${String(count + 1).padStart(3, '0')}`;
    
    const note = new Note({
      ...req.body,
      noteId
    });
    
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('sharedWith.employeeId', 'name email');
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get note statistics
const getNoteStats = async (req, res) => {
  try {
    const totalNotes = await Note.countDocuments();
    const active = await Note.countDocuments({ status: 'Active' });
    const archived = await Note.countDocuments({ status: 'Archived' });
    const draft = await Note.countDocuments({ status: 'Draft' });
    
    // Category breakdown
    const categoryStats = await Note.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Priority breakdown
    const priorityStats = await Note.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Recent activity (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const recentNotes = await Note.countDocuments({
      createdAt: { $gte: weekAgo }
    });
    
    // Due soon (next 7 days)
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const dueSoon = await Note.countDocuments({
      dueDate: { $gte: new Date(), $lte: nextWeek },
      status: 'Active'
    });
    
    res.json({
      totalNotes,
      active,
      archived,
      draft,
      categoryStats,
      priorityStats,
      recentNotes,
      dueSoon
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Share note with employees
const shareNote = async (req, res) => {
  try {
    const { employeeId, employeeName, permission } = req.body;
    
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    // Check if already shared with this employee
    const existingShare = note.sharedWith.find(s => s.employeeId.toString() === employeeId);
    if (existingShare) {
      existingShare.permission = permission || 'Read';
    } else {
      note.sharedWith.push({
        employeeId,
        employeeName,
        permission: permission || 'Read'
      });
    }
    
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove share
const removeShare = async (req, res) => {
  try {
    const { employeeId } = req.body;
    
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    note.sharedWith = note.sharedWith.filter(s => s.employeeId.toString() !== employeeId);
    
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add comment to note
const addComment = async (req, res) => {
  try {
    const { author, content } = req.body;
    
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    note.comments.push({
      author,
      content
    });
    
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Archive note
const archiveNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { status: 'Archived' },
      { new: true, runValidators: true }
    );
    
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    res.json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Search notes
const searchNotes = async (req, res) => {
  try {
    const { query, category, priority, author } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (author) filter.author = author;
    
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ];
    }
    
    const notes = await Note.find(filter)
      .populate('sharedWith.employeeId', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  getNoteStats,
  shareNote,
  removeShare,
  addComment,
  archiveNote,
  searchNotes
};