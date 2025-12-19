const JobPosting = require("../models/JobPosting");

const generateJobId = async () => {
  const count = await JobPosting.countDocuments();
  return `JP-${new Date().getFullYear()}-${String(count + 1).padStart(3, "0")}`;
};

exports.getAll = async (_req, res) => {
  try {
    const jobs = await JobPosting.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job postings", error: error.message });
  }
};

exports.create = async (req, res) => {
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
    } = req.body;

    if (!title) return res.status(400).json({ message: "Title is required" });

    const job = new JobPosting({
      jobId: await generateJobId(),
      title,
      department,
      location,
      type,
      postedDate: postedDate || Date.now(),
      closingDate: closingDate || null,
      status: status || "Draft",
      applicants: applicants || 0,
      salary: salary || "",
      experience: experience || "",
      description: description || "",
      priority: priority || "Medium",
    });

    const saved = await job.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error creating job posting", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updates = { ...req.body };
    const updated = await JobPosting.findOneAndUpdate(
      { jobId: req.params.id },
      { ...updates, updatedAt: Date.now() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Job posting not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating job posting", error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await JobPosting.findOneAndDelete({ jobId: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Job posting not found" });
    res.status(200).json({ message: "Job posting deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job posting", error: error.message });
  }
};






