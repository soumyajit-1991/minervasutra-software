const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    employeeName: { type: String, required: true },
    employeeEmail: { type: String, required: true, lowercase: true },
    meetingDate: { type: Date, required: true },
    meetingTime: { type: String, required: true },
    meetingLink: { type: String },
    description: { type: String },
    status: { type: String, default: "Scheduled" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
