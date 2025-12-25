// const JobPosting = require('../models/JobPosting');

// // Get all job postings
// const getJobPostings = async (req, res) => {
//   try {
//     const jobPostings = await JobPosting.find().sort({ createdAt: -1 });
//     res.json(jobPostings);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get job posting by ID
// const getJobPostingById = async (req, res) => {
//   try {
//     const jobPosting = await JobPosting.findById(req.params.id);
//     if (!jobPosting) {
//       return res.status(404).json({ error: 'Job posting not found' });
//     }
//     res.json(jobPosting);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Create new job posting
// const createJobPosting = async (req, res) => {
//   try {
//     // Generate job ID
//     const count = await JobPosting.countDocuments();
//     const jobId = `JP-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;
    
//     const jobPosting = new JobPosting({
//       ...req.body,
//       jobId
//     });
    
//     const savedJobPosting = await jobPosting.save();
//     res.status(201).json(savedJobPosting);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Update job posting
// const updateJobPosting = async (req, res) => {
//   try {
//     const jobPosting = await JobPosting.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
    
//     if (!jobPosting) {
//       return res.status(404).json({ error: 'Job posting not found' });
//     }
    
//     res.json(jobPosting);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Delete job posting
// const deleteJobPosting = async (req, res) => {
//   try {
//     const jobPosting = await JobPosting.findByIdAndDelete(req.params.id);
//     if (!jobPosting) {
//       return res.status(404).json({ error: 'Job posting not found' });
//     }
//     res.json({ message: 'Job posting deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get job posting statistics
// const getJobPostingStats = async (req, res) => {
//   try {
//     const active = await JobPosting.countDocuments({ status: 'Active' });
//     const draft = await JobPosting.countDocuments({ status: 'Draft' });
//     const closed = await JobPosting.countDocuments({ status: 'Closed' });
//     const onHold = await JobPosting.countDocuments({ status: 'On Hold' });
    
//     // Total applicants across all job postings
//     const totalApplicantsResult = await JobPosting.aggregate([
//       { $group: { _id: null, totalApplicants: { $sum: '$applicants' } } }
//     ]);
//     const totalApplicants = totalApplicantsResult[0]?.totalApplicants || 0;
    
//     res.json({
//       active,
//       draft,
//       closed,
//       onHold,
//       totalApplicants
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   getJobPostings,
//   getJobPostingById,
//   createJobPosting,
//   updateJobPosting,
//   deleteJobPosting,
//   getJobPostingStats
// };


const JobPosting = require('../models/JobPosting');

// ===============================
// GET ALL JOB POSTINGS
// ===============================
exports.getJobPostings = async (req, res) => {
  try {
    const jobs = await JobPosting.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// GET JOB POSTING BY ID
// ===============================
exports.getJobPostingById = async (req, res) => {
  try {
    const job = await JobPosting.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job posting not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ===============================
// CREATE JOB POSTING ✅ FIXED
// ===============================
exports.createJobPosting = async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      type,
      postedDate,
      closingDate,
      status,
      applicants,
      salary,
      experience,
      description,
      priority,
      hiringManager
    } = req.body;

    // 🔴 Validation
    if (!title || !department || !location || !closingDate || !salary || !experience || !description || !hiringManager) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 🔹 Auto-generate Job ID
    const jobId = `JOB-${Date.now()}`;

    const newJob = new JobPosting({
      jobId,
      title,
      department,
      location,
      type,
      postedDate: postedDate || Date.now(),
      closingDate,
      status,
      applicants,
      salary,
      experience,
      description,
      priority,
      hiringManager
    });

    await newJob.save();

    res.status(201).json({
      message: 'Job posting created successfully',
      job: newJob
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ===============================
// UPDATE JOB POSTING
// ===============================
exports.updateJobPosting = async (req, res) => {
  try {
    const updatedJob = await JobPosting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job posting not found' });
    }

    res.json({
      message: 'Job posting updated successfully',
      job: updatedJob
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ===============================
// DELETE JOB POSTING
// ===============================
exports.deleteJobPosting = async (req, res) => {
  try {
    const deletedJob = await JobPosting.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ error: 'Job posting not found' });
    }

    res.json({ message: 'Job posting deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ===============================
// JOB POSTING STATS
// ===============================
exports.getJobPostingStats = async (req, res) => {
  try {
    const total = await JobPosting.countDocuments();
    const active = await JobPosting.countDocuments({ status: 'Active' });
    const closed = await JobPosting.countDocuments({ status: 'Closed' });
    const draft = await JobPosting.countDocuments({ status: 'Draft' });

    res.json({
      total,
      active,
      closed,
      draft
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
