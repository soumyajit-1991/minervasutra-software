const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/noteController');

// GET /api/notes - Get all notes
router.get('/', getNotes);

// GET /api/notes/search - Search notes
router.get('/search', searchNotes);

// GET /api/notes/stats - Get note statistics
router.get('/stats', getNoteStats);

// GET /api/notes/:id - Get note by ID
router.get('/:id', getNoteById);

// POST /api/notes - Create new note
router.post('/', createNote);

// PUT /api/notes/:id - Update note
router.put('/:id', updateNote);

// POST /api/notes/:id/share - Share note with employee
router.post('/:id/share', shareNote);

// POST /api/notes/:id/unshare - Remove share
router.post('/:id/unshare', removeShare);

// POST /api/notes/:id/comment - Add comment to note
router.post('/:id/comment', addComment);

// PUT /api/notes/:id/archive - Archive note
router.put('/:id/archive', archiveNote);

// DELETE /api/notes/:id - Delete note
router.delete('/:id', deleteNote);

module.exports = router;