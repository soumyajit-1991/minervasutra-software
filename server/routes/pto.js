const express = require('express');
const router = express.Router();
const PTO = require('../models/PTO');

// Get all PTO requests
router.get('/', async (req, res) => {
  try {
    const ptoRequests = await PTO.find().sort({ createdAt: -1 });
    res.json(ptoRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create PTO request
router.post('/', async (req, res) => {
  try {
    const pto = new PTO({
      ...req.body,
      requestedDate: new Date().toISOString().split('T')[0]
    });
    const savedPTO = await pto.save();
    res.status(201).json(savedPTO);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update PTO request (approve/reject)
router.put('/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.body.status === 'Approved' || req.body.status === 'Rejected') {
      updateData.approvalDate = new Date().toISOString().split('T')[0];
    }
    
    const pto = await PTO.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!pto) return res.status(404).json({ message: 'PTO request not found' });
    res.json(pto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete PTO request
router.delete('/:id', async (req, res) => {
  try {
    const pto = await PTO.findByIdAndDelete(req.params.id);
    if (!pto) return res.status(404).json({ message: 'PTO request not found' });
    res.json({ message: 'PTO request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;