const Candidate = require('../models/Candidate');

// Get all candidates
const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .populate('jobPostingId', 'title department')
      .sort({ createdAt: -1 });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get candidate by ID
const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id)
      .populate('jobPostingId', 'title department');
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new candidate
const createCandidate = async (req, res) => {
  try {
    // Generate candidate ID
    const count = await Candidate.countDocuments();
    const candidateId = `CND-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;
    
    const candidate = new Candidate({
      ...req.body,
      candidateId
    });
    
    const savedCandidate = await candidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update candidate
const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('jobPostingId', 'title department');
    
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    
    res.json(candidate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete candidate
const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get candidate statistics
const getCandidateStats = async (req, res) => {
  try {
    const totalCandidates = await Candidate.countDocuments();
    const screening = await Candidate.countDocuments({ stage: 'Screening' });
    const phoneInterview = await Candidate.countDocuments({ stage: 'Phone Interview' });
    const technicalInterview = await Candidate.countDocuments({ stage: 'Technical Interview' });
    const finalInterview = await Candidate.countDocuments({ stage: 'Final Interview' });
    const offer = await Candidate.countDocuments({ stage: 'Offer' });
    const rejected = await Candidate.countDocuments({ stage: 'Rejected' });
    const hired = await Candidate.countDocuments({ stage: 'Hired' });
    
    // Stage breakdown
    const stageStats = [
      { id: 'screening', name: 'Screening', count: screening, color: 'blue' },
      { id: 'phone-interview', name: 'Phone Interview', count: phoneInterview, color: 'purple' },
      { id: 'technical-interview', name: 'Technical Interview', count: technicalInterview, color: 'indigo' },
      { id: 'final-interview', name: 'Final Interview', count: finalInterview, color: 'orange' },
      { id: 'offer', name: 'Offer', count: offer, color: 'green' },
      { id: 'rejected', name: 'Rejected', count: rejected, color: 'red' },
      { id: 'hired', name: 'Hired', count: hired, color: 'emerald' }
    ];
    
    res.json({
      totalCandidates,
      screening,
      interviewing: phoneInterview + technicalInterview + finalInterview,
      offered: offer,
      hired,
      rejected,
      stages: stageStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update candidate stage
const updateCandidateStage = async (req, res) => {
  try {
    const { stage, nextStep } = req.body;
    
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { stage, nextStep },
      { new: true, runValidators: true }
    );
    
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    
    res.json(candidate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidateStats,
  updateCandidateStage
};