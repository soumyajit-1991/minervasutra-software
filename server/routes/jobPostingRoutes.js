// const express = require('express');
// const router = express.Router();
// const {
//   getJobPostings,
//   getJobPostingById,
//   createJobPosting,
//   updateJobPosting,
//   deleteJobPosting,
//   getJobPostingStats
// } = require('../controllers/jobPostingController');

// // GET /api/job-postings - Get all job postings
// router.get('/', getJobPostings);

// // GET /api/job-postings/stats - Get job posting statistics
// router.get('/stats', getJobPostingStats);

// // GET /api/job-postings/:id - Get job posting by ID
// router.get('/:id', getJobPostingById);

// // POST /api/job-postings - Create new job posting
// router.post('/', createJobPosting);

// // PUT /api/job-postings/:id - Update job posting
// router.put('/:id', updateJobPosting);

// // DELETE /api/job-postings/:id - Delete job posting
// router.delete('/:id', deleteJobPosting);

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
  getJobPostings,
  getJobPostingById,
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
  getJobPostingStats
} = require('../controllers/jobPostingController');

router.get('/', getJobPostings);
router.get('/stats', getJobPostingStats);
router.get('/:id', getJobPostingById);
router.post('/', createJobPosting);
router.put("/:id", async (req, res) => {
  try {
    const updated = await JobPosting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', deleteJobPosting);

module.exports = router;
