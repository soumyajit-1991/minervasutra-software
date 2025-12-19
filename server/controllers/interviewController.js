const Interview = require('../models/Interview');

// Generate custom ID like INT001
const generateInterviewId = async () => {
      const lastInterview = await Interview.findOne({}, { interviewId: 1 }).sort({ createdAt: -1 });
      let nextId = 1;
      if (lastInterview && lastInterview.interviewId) {
            const lastIdNum = parseInt(lastInterview.interviewId.replace('INT', ''), 10);
            if (!isNaN(lastIdNum)) {
                  nextId = lastIdNum + 1;
            }
      }
      return `INT${String(nextId).padStart(3, '0')}`;
};

exports.getAllInterviews = async (req, res) => {
      try {
            const interviews = await Interview.find().sort({ date: 1, time: 1 });
            res.status(200).json(interviews);
      } catch (error) {
            res.status(500).json({ message: 'Error fetching interviews', error: error.message });
      }
};

exports.getInterviewById = async (req, res) => {
      try {
            const { id } = req.params;
            const interview = await Interview.findOne({ interviewId: id });

            if (!interview) {
                  return res.status(404).json({ message: 'Interview not found' });
            }

            res.status(200).json(interview);
      } catch (error) {
            res.status(500).json({ message: 'Error fetching interview', error: error.message });
      }
};

exports.createInterview = async (req, res) => {
      try {
            const interviewId = await generateInterviewId();
            const newInterview = new Interview({
                  interviewId,
                  ...req.body
            });

            const savedInterview = await newInterview.save();
            res.status(201).json(savedInterview);
      } catch (error) {
            res.status(500).json({ message: 'Error creating interview', error: error.message });
      }
};

exports.updateInterview = async (req, res) => {
      try {
            const { id } = req.params;
            const updates = req.body;

            const interview = await Interview.findOneAndUpdate(
                  { interviewId: id },
                  { ...updates, updatedAt: Date.now() },
                  { new: true }
            );

            if (!interview) {
                  return res.status(404).json({ message: 'Interview not found' });
            }

            res.status(200).json(interview);
      } catch (error) {
            res.status(500).json({ message: 'Error updating interview', error: error.message });
      }
};

exports.deleteInterview = async (req, res) => {
      try {
            const { id } = req.params;
            const interview = await Interview.findOneAndDelete({ interviewId: id });

            if (!interview) {
                  return res.status(404).json({ message: 'Interview not found' });
            }

            res.status(200).json({ message: 'Interview deleted successfully' });
      } catch (error) {
            res.status(500).json({ message: 'Error deleting interview', error: error.message });
      }
};
