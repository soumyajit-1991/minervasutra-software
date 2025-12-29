const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// ✅ GET ALL FEEDBACK (ADMIN)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE STATUS (Pending / Done)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
