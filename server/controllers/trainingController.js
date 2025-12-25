const Training = require('../models/Training');

// Get all trainings
const getTrainings = async (req, res) => {
  try {
    const trainings = await Training.find()
      .populate('participants.employeeId', 'name email department')
      .sort({ startDate: -1 });
    res.json(trainings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get training by ID
const getTrainingById = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id)
      .populate('participants.employeeId', 'name email department')
      .populate('feedback.employeeId', 'name');
    if (!training) {
      return res.status(404).json({ error: 'Training not found' });
    }
    res.json(training);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new training
const createTraining = async (req, res) => {
  try {
    // Generate training ID
    const count = await Training.countDocuments();
    const trainingId = `TRN-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;
    
    const training = new Training({
      ...req.body,
      trainingId
    });
    
    const savedTraining = await training.save();
    res.status(201).json(savedTraining);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update training
const updateTraining = async (req, res) => {
  try {
    const training = await Training.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('participants.employeeId', 'name email department');
    
    if (!training) {
      return res.status(404).json({ error: 'Training not found' });
    }
    
    res.json(training);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete training
const deleteTraining = async (req, res) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) {
      return res.status(404).json({ error: 'Training not found' });
    }
    res.json({ message: 'Training deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get training statistics
const getTrainingStats = async (req, res) => {
  try {
    const totalTrainings = await Training.countDocuments();
    const ongoing = await Training.countDocuments({ status: 'Ongoing' });
    const completed = await Training.countDocuments({ status: 'Completed' });
    const upcoming = await Training.countDocuments({ status: 'Upcoming' });
    const cancelled = await Training.countDocuments({ status: 'Cancelled' });
    
    // Category breakdown
    const categoryStats = await Training.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // Enrollment stats
    const enrollmentStats = await Training.aggregate([
      { $group: { _id: null, totalEnrolled: { $sum: '$enrolled' }, totalCapacity: { $sum: '$capacity' } } }
    ]);
    
    res.json({
      totalTrainings,
      ongoing,
      completed,
      upcoming,
      cancelled,
      categoryStats,
      enrollmentStats: enrollmentStats[0] || { totalEnrolled: 0, totalCapacity: 0 }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Enroll employee in training
const enrollEmployee = async (req, res) => {
  try {
    const { employeeId, employeeName } = req.body;
    
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ error: 'Training not found' });
    }
    
    // Check if already enrolled
    const alreadyEnrolled = training.participants.some(p => p.employeeId.toString() === employeeId);
    if (alreadyEnrolled) {
      return res.status(400).json({ error: 'Employee already enrolled in this training' });
    }
    
    // Check capacity
    if (training.enrolled >= training.capacity) {
      return res.status(400).json({ error: 'Training is at full capacity' });
    }
    
    training.participants.push({
      employeeId,
      employeeName
    });
    training.enrolled += 1;
    
    await training.save();
    res.json(training);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove employee from training
const removeEmployee = async (req, res) => {
  try {
    const { employeeId } = req.body;
    
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ error: 'Training not found' });
    }
    
    const participantIndex = training.participants.findIndex(p => p.employeeId.toString() === employeeId);
    if (participantIndex === -1) {
      return res.status(404).json({ error: 'Employee not enrolled in this training' });
    }
    
    training.participants.splice(participantIndex, 1);
    training.enrolled = Math.max(0, training.enrolled - 1);
    
    await training.save();
    res.json(training);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mark training as completed for employee
const markCompleted = async (req, res) => {
  try {
    const { employeeId, certificateIssued } = req.body;
    
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ error: 'Training not found' });
    }
    
    const participant = training.participants.find(p => p.employeeId.toString() === employeeId);
    if (!participant) {
      return res.status(404).json({ error: 'Employee not enrolled in this training' });
    }
    
    participant.status = 'Completed';
    participant.completionDate = new Date();
    participant.certificateIssued = certificateIssued || false;
    
    await training.save();
    res.json(training);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add training feedback
const addFeedback = async (req, res) => {
  try {
    const { employeeId, rating, comments } = req.body;
    
    const training = await Training.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ error: 'Training not found' });
    }
    
    // Check if employee is enrolled
    const isEnrolled = training.participants.some(p => p.employeeId.toString() === employeeId);
    if (!isEnrolled) {
      return res.status(400).json({ error: 'Employee must be enrolled to provide feedback' });
    }
    
    // Remove existing feedback from same employee
    training.feedback = training.feedback.filter(f => f.employeeId.toString() !== employeeId);
    
    // Add new feedback
    training.feedback.push({
      employeeId,
      rating,
      comments
    });
    
    await training.save();
    res.json(training);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
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
};