const express = require('express');
const router = express.Router();
const {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidateStats,
  updateCandidateStage
} = require('../controllers/candidateController');

// GET /api/candidates - Get all candidates
router.get('/', getCandidates);

// GET /api/candidates/stats - Get candidate statistics
router.get('/stats', getCandidateStats);

// GET /api/candidates/:id - Get candidate by ID
router.get('/:id', getCandidateById);

// POST /api/candidates - Create new candidate
router.post('/', createCandidate);

// PUT /api/candidates/:id - Update candidate
router.put('/:id', updateCandidate);

// PUT /api/candidates/:id/stage - Update candidate stage
router.put('/:id/stage', updateCandidateStage);

// DELETE /api/candidates/:id - Delete candidate
router.delete('/:id', deleteCandidate);

module.exports = router;