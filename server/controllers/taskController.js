const Task = require("../models/Task");

exports.getTasksByEmployee = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        message: "Employee email is required",
      });
    }

    const tasks = await Task.find({
      assignedTo: {
        $regex: new RegExp(`^${email}$`, "i"),
      },
    });
    console.log("Fetched tasks:", tasks);

    // ✅ Always return 200 with array
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Task fetch error:", error);
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};
