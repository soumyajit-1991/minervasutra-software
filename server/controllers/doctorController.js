const Doctor = require("../models/Doctor.js");

// @desc Get all doctors
// @route GET /api/doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add a new doctor
// @route POST /api/doctors
exports.addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Update doctor
// @route PUT /api/doctors/:id
exports.updateDoctor = async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Delete doctor
// @route DELETE /api/doctors/:id
exports.deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
