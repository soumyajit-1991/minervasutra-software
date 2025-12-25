// const express = require('express');
// const router = express.Router();
// const {
//   getInterviews,
//   getInterviewById,
//   createInterview,
//   updateInterview,
//   deleteInterview,
//   getInterviewStats,
//   updateInterviewFeedback
// } = require('../controllers/interviewController');

// // GET /api/interviews - Get all interviews
// router.get('/', getInterviews);

// // GET /api/interviews/stats - Get interview statistics
// router.get('/stats', getInterviewStats);

// // GET /api/interviews/:id - Get interview by ID
// router.get('/:id', getInterviewById);

// // POST /api/interviews - Create new interview
// router.post('/', createInterview);

// // PUT /api/interviews/:id - Update interview
// router.put('/:id', updateInterview);

// // PUT /api/interviews/:id/feedback - Update interview feedback
// router.put('/:id/feedback', updateInterviewFeedback);

// // DELETE /api/interviews/:id - Delete interview
// router.delete('/:id', deleteInterview);

// module.exports = router;


const express = require('express');
const router = express.Router();

const {
  getInterviews,
  getInterviewById,
  createInterview,
  updateInterview,
  deleteInterview,
  getInterviewStats
} = require('../controllers/interviewController');

router.get('/', getInterviews);
router.get('/stats', getInterviewStats);
router.get('/:id', getInterviewById);
router.post('/', createInterview);
router.put('/:id', updateInterview);
router.delete('/:id', deleteInterview);

module.exports = router;
