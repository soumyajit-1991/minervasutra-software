const Candidate = require('../models/Candidate');

// Generate custom ID like CAN001
const generateCandidateId = async () => {
      const lastCandidate = await Candidate.findOne({}, { candidateId: 1 }).sort({ createdAt: -1 });
      let nextId = 1;
      if (lastCandidate && lastCandidate.candidateId) {
            const lastIdNum = parseInt(lastCandidate.candidateId.replace('CAN', ''), 10);
            if (!isNaN(lastIdNum)) {
                  nextId = lastIdNum + 1;
            }
      }
      return `CAN${String(nextId).padStart(3, '0')}`;
};

exports.getAllCandidates = async (req, res) => {
      try {
            const candidates = await Candidate.find().sort({ createdAt: -1 });
            res.status(200).json(candidates);
      } catch (error) {
            res.status(500).json({ message: 'Error fetching candidates', error: error.message });
      }
};

exports.createCandidate = async (req, res) => {
      try {
            const { name, email, phone, position, experience, recruiter, stage, status, rating, nextStep } = req.body;

            if (!name || !email || !phone || !position) {
                  return res.status(400).json({ message: 'Missing required fields' });
            }

            const candidateId = await generateCandidateId();

            const newCandidate = new Candidate({
                  candidateId,
                  name,
                  email,
                  phone,
                  position,
                  experience,
                  recruiter,
                  stage,
                  status,
                  rating,
                  nextStep
            });

            const savedCandidate = await newCandidate.save();
            res.status(201).json(savedCandidate);
      } catch (error) {
            res.status(500).json({ message: 'Error creating candidate', error: error.message });
      }
};

exports.updateCandidate = async (req, res) => {
      try {
            const { id } = req.params;
            const updates = req.body;

            const candidate = await Candidate.findOneAndUpdate(
                  { candidateId: id },
                  { ...updates, updatedAt: Date.now() },
                  { new: true }
            );

            if (!candidate) {
                  return res.status(404).json({ message: 'Candidate not found' });
            }

            res.status(200).json(candidate);
      } catch (error) {
            res.status(500).json({ message: 'Error updating candidate', error: error.message });
      }
};

exports.deleteCandidate = async (req, res) => {
      try {
            const { id } = req.params;
            const candidate = await Candidate.findOneAndDelete({ candidateId: id });

            if (!candidate) {
                  return res.status(404).json({ message: 'Candidate not found' });
            }

            res.status(200).json({ message: 'Candidate deleted successfully' });
      } catch (error) {
            res.status(500).json({ message: 'Error deleting candidate', error: error.message });
      }
};

exports.getCandidateById = async (req, res) => {
      try {
            const { id } = req.params;
            const candidate = await Candidate.findOne({ candidateId: id });

            if (!candidate) {
                  return res.status(404).json({ message: 'Candidate not found' });
            }

            res.status(200).json(candidate);
      } catch (error) {
            res.status(500).json({ message: 'Error fetching candidate', error: error.message });
      }
};
