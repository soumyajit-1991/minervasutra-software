const Feedback = require("../models/Feedback");

exports.createFeedback = async (req, res) => {
  try {
    const { message, email, role } = req.body;

    const feedback = await Feedback.create({
      message,
      email,
      role
    });

    res.status(201).json(feedback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
