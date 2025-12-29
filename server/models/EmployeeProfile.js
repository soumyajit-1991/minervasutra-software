const mongoose = require("mongoose");

const employeeProfileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    personalInfo: {
      dob: String,
      maritalStatus: String,
      gender: String,
      address: String,
      nationality: String,
    },

    about: {
      type: String,
    },

    experience: {
      years: Number,
      description: String,
    },

    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "EmployeeProfile",
  employeeProfileSchema
);
