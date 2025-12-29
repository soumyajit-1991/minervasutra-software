const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEmployeeEvents = async (req, res) => {
  const email = req.params.email.toLowerCase();

  const events = await Event.find({ employeeEmail: email }).sort({ meetingDate: 1 });
  res.json(events);
};
