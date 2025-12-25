// const Interview = require('../models/Interview');
// const Candidate = require('../models/Candidate');

// // Get all interviews
// const getInterviews = async (req, res) => {
//   try {
//     const interviews = await Interview.find()
//       .populate('candidateId', 'name email phone position')
//       .sort({ date: 1 });
//     res.json(interviews);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get interview by ID
// const getInterviewById = async (req, res) => {
//   try {
//     const interview = await Interview.findById(req.params.id)
//       .populate('candidateId', 'name email phone position');
//     if (!interview) {
//       return res.status(404).json({ error: 'Interview not found' });
//     }
//     res.json(interview);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Create new interview
// const createInterview = async (req, res) => {
//   try {
//     // Generate interview ID
//     const count = await Interview.countDocuments();
//     const interviewId = `INT-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;
    
//     const interview = new Interview({
//       ...req.body,
//       interviewId
//     });
    
//     const savedInterview = await interview.save();
    
//     // Update candidate stage if needed
//     if (req.body.candidateId) {
//       await Candidate.findByIdAndUpdate(
//         req.body.candidateId,
//         { 
//           stage: req.body.interviewType.includes('Phone') ? 'Phone Interview' : 
//                  req.body.interviewType.includes('Technical') ? 'Technical Interview' : 
//                  'Final Interview',
//           nextStep: `${req.body.interviewType} scheduled`
//         }
//       );
//     }
    
//     res.status(201).json(savedInterview);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Update interview
// const updateInterview = async (req, res) => {
//   try {
//     const interview = await Interview.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     ).populate('candidateId', 'name email phone position');
    
//     if (!interview) {
//       return res.status(404).json({ error: 'Interview not found' });
//     }
    
//     res.json(interview);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Delete interview
// const deleteInterview = async (req, res) => {
//   try {
//     const interview = await Interview.findByIdAndDelete(req.params.id);
//     if (!interview) {
//       return res.status(404).json({ error: 'Interview not found' });
//     }
//     res.json({ message: 'Interview deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get interview statistics
// const getInterviewStats = async (req, res) => {
//   try {
//     const scheduled = await Interview.countDocuments({ status: 'Scheduled' });
//     const completed = await Interview.countDocuments({ status: 'Completed' });
//     const cancelled = await Interview.countDocuments({ status: 'Cancelled' });
//     const rescheduled = await Interview.countDocuments({ status: 'Rescheduled' });
    
//     // Upcoming interviews (next 7 days)
//     const nextWeek = new Date();
//     nextWeek.setDate(nextWeek.getDate() + 7);
//     const upcoming = await Interview.countDocuments({
//       date: { $gte: new Date(), $lte: nextWeek },
//       status: 'Scheduled'
//     });
    
//     res.json({
//       scheduled,
//       completed,
//       cancelled,
//       rescheduled,
//       upcoming
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update interview feedback
// const updateInterviewFeedback = async (req, res) => {
//   try {
//     const { feedback } = req.body;
    
//     const interview = await Interview.findByIdAndUpdate(
//       req.params.id,
//       { 
//         feedback,
//         status: 'Completed'
//       },
//       { new: true, runValidators: true }
//     );
    
//     if (!interview) {
//       return res.status(404).json({ error: 'Interview not found' });
//     }
    
//     // Update candidate stage based on feedback
//     if (interview.candidateId && feedback.recommendation) {
//       let newStage = interview.candidateId.stage;
//       let nextStep = '';
      
//       if (feedback.recommendation === 'Proceed') {
//         if (interview.interviewType === 'Phone Screening') {
//           newStage = 'Technical Interview';
//           nextStep = 'Schedule technical interview';
//         } else if (interview.interviewType === 'Technical Interview') {
//           newStage = 'Final Interview';
//           nextStep = 'Schedule final interview';
//         } else if (interview.interviewType === 'Final Interview') {
//           newStage = 'Offer';
//           nextStep = 'Prepare offer letter';
//         }
//       } else if (feedback.recommendation === 'Reject') {
//         newStage = 'Rejected';
//         nextStep = 'Send rejection email';
//       }
      
//       await Candidate.findByIdAndUpdate(
//         interview.candidateId,
//         { stage: newStage, nextStep }
//       );
//     }
    
//     res.json(interview);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = {
//   getInterviews,
//   getInterviewById,
//   createInterview,
//   updateInterview,
//   deleteInterview,
//   getInterviewStats,
//   updateInterviewFeedback
// };



const Interview = require('../models/Interview');
const Candidate = require('../models/Candidate');

// =======================
// GET ALL INTERVIEWS
// =======================
exports.getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate('candidateId', 'name email phone position')
      .sort({ date: 1 });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =======================
// GET INTERVIEW BY ID
// =======================
exports.getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate('candidateId', 'name email phone position');

    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    res.json(interview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =======================
// CREATE INTERVIEW ✅ FIXED
// =======================
exports.createInterview = async (req, res) => {
  try {
    const {
      candidateId,
      interviewType,
      date,
      time,
      duration,
      interviewer,
      location,
      mode,
      notes,
      meetingLink
    } = req.body;

    // 🔴 Validate required fields
    if (!candidateId || !interviewType || !date || !time || !duration || !interviewer || !location || !mode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 🔹 Fetch candidate
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    // 🔹 Generate Interview ID
    const count = await Interview.countDocuments();
    const interviewId = `INT-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;

    const interview = new Interview({
      interviewId,
      candidateId,
      candidateName: candidate.name,
      candidateAvatar: candidate.avatar || '',
      position: candidate.position,
      interviewType,
      date: new Date(date),
      time,
      duration,
      interviewer,
      location,
      mode,
      notes,
      meetingLink
    });

    const savedInterview = await interview.save();

    // 🔹 Update candidate stage
    let stage = 'Interview Scheduled';
    if (interviewType === 'Phone Screening') stage = 'Phone Interview';
    if (interviewType === 'Technical Interview') stage = 'Technical Interview';
    if (interviewType === 'Final Interview') stage = 'Final Interview';

    await Candidate.findByIdAndUpdate(candidateId, {
      stage,
      nextStep: `${interviewType} scheduled`
    });

    res.status(201).json(savedInterview);
  } catch (error) {
    console.error('Create interview error:', error);
    res.status(400).json({ error: error.message });
  }
};

// =======================
// UPDATE INTERVIEW
// =======================
exports.updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    res.json(interview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// =======================
// DELETE INTERVIEW
// =======================
exports.deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id);
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }
    res.json({ message: 'Interview deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =======================
// INTERVIEW STATS
// =======================
exports.getInterviewStats = async (req, res) => {
  try {
    const scheduled = await Interview.countDocuments({ status: 'Scheduled' });
    const completed = await Interview.countDocuments({ status: 'Completed' });
    const cancelled = await Interview.countDocuments({ status: 'Cancelled' });
    const rescheduled = await Interview.countDocuments({ status: 'Rescheduled' });

    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const upcoming = await Interview.countDocuments({
      date: { $gte: new Date(), $lte: nextWeek },
      status: 'Scheduled'
    });

    res.json({ scheduled, completed, cancelled, rescheduled, upcoming });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
