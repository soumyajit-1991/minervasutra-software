const express = require('express');
const Overtime = require('../models/Overtime');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const records = await Overtime.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const overtime = new Overtime(req.body);
    await overtime.save();
    res.status(201).json(overtime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const overtime = await Overtime.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(overtime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;