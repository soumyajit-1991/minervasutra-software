// const express = require('express');
// const router = express.Router();


// // GET /api/performance - Get all performance reviews
// router.get('/', getPerformanceReviews);

// // GET /api/performance/stats - Get performance statistics
// router.get('/stats', getPerformanceStats);

// // GET /api/performance/:id - Get performance review by ID
// router.get('/:id', getPerformanceById);

// // POST /api/performance - Create performance review
// router.post('/', createPerformanceReview);

// // PUT /api/performance/:id - Update performance review
// router.put('/:id', updatePerformanceReview);

// // PUT /api/performance/:id/submit - Submit performance review
// router.put('/:id/submit', submitPerformanceReview);

// // PUT /api/performance/:id/feedback - Add employee feedback
// router.put('/:id/feedback', addEmployeeFeedback);

// // DELETE /api/performance/:id - Delete performance review
// 

// module.exports = router;
const express = require("express");
const router = express.Router();
const Performance = require("../models/Performance");
const {
  // getPerformanceReviews,
  // getPerformanceById,
  // createPerformanceReview,
  // updatePerformanceReview,
  deletePerformanceReview,
  // getPerformanceStats,
  // submitPerformanceReview,
  // addEmployeeFeedback
} = require('../controllers/performanceController');

/* ================= GET ALL REVIEWS ================= */
router.get("/", async (req, res) => {
  try {
    const reviews = await Performance.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ error: "Failed to fetch performance reviews" });
  }
});
router.delete('/:id', deletePerformanceReview);

/* ================= CREATE REVIEW ================= */
router.post("/", async (req, res) => {
  try {
    const review = new Performance({
      employee: req.body.employee,
      department: req.body.department,
      role: req.body.role,
      rating: req.body.rating,
      reviewer: req.body.reviewer,
      date: new Date(req.body.date),
      status: req.body.status,
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(400).json({ error: error.message });
  }
});

/* ================= UPDATE REVIEW ================= */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Performance.findByIdAndUpdate(
      req.params.id,
      {
        employee: req.body.employee,
        department: req.body.department,
        role: req.body.role,
        rating: req.body.rating,
        reviewer: req.body.reviewer,
        date: new Date(req.body.date),
        status: req.body.status,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/* ================= PATCH REVIEW (partial update) ================= */
router.patch("/:id", async (req, res) => {
  try {
    const updated = await Performance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("PATCH ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
