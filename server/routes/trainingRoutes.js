const express = require('express');
const router = express.Router();
const {
  getTrainings,
  getTrainingById,
  createTraining,
  updateTraining,
  deleteTraining,
  getTrainingStats,
  enrollEmployee,
  removeEmployee,
  markCompleted,
  addFeedback
} = require('../controllers/trainingController');

// GET /api/trainings - Get all trainings
router.get('/', getTrainings);

// GET /api/trainings/stats - Get training statistics
router.get('/stats', getTrainingStats);

// GET /api/trainings/:id - Get training by ID
router.get('/:id', getTrainingById);

// POST /api/trainings - Create new training
router.post('/', createTraining);

// PUT /api/trainings/:id - Update training
router.put('/:id', updateTraining);

// POST /api/trainings/:id/enroll - Enroll employee in training
router.post('/:id/enroll', enrollEmployee);

// POST /api/trainings/:id/remove - Remove employee from training
router.post('/:id/remove', removeEmployee);

// POST /api/trainings/:id/complete - Mark training as completed for employee
router.post('/:id/complete', markCompleted);

// POST /api/trainings/:id/feedback - Add training feedback
router.post('/:id/feedback', addFeedback);

// DELETE /api/trainings/:id - Delete training
router.delete('/:id', deleteTraining);

module.exports = router;