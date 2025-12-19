const mongoose = require("mongoose");

const JobPostingSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    department: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    type: { type: String, default: "", trim: true },
    postedDate: { type: Date, default: Date.now },
    closingDate: { type: Date, default: null },
    status: { type: String, enum: ["Active", "Draft", "Closed"], default: "Draft" },
    applicants: { type: Number, default: 0, min: 0 },
    salary: { type: String, default: "" },
    experience: { type: String, default: "" },
    description: { type: String, default: "" },
    priority: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobPosting", JobPostingSchema);






