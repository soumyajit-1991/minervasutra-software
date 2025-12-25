const Timesheet = require("../models/TimeSheet");

// CREATE
exports.createTimesheet = async (req, res) => {
  try {
    const timesheet = new Timesheet(req.body);
    const saved = await timesheet.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET ALL
exports.getTimesheets = async (req, res) => {
  try {
    const data = await Timesheet.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
