const express = require('express');
const router = express.Router();
const Training = require('../models/Training');

// Get all trainings
router.get('/', async (req, res) => {
  try {
    const trainings = await Training.find().sort({ createdAt: -1 });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create training
router.post('/', async (req, res) => {
  try {
    const training = new Training(req.body);
    const savedTraining = await training.save();
    res.status(201).json(savedTraining);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update training
router.put('/:id', async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!training) return res.status(404).json({ message: 'Training not found' });
    res.json(training);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete training
router.delete('/:id', async (req, res) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) return res.status(404).json({ message: 'Training not found' });
    res.json({ message: 'Training deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;