const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    role: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
