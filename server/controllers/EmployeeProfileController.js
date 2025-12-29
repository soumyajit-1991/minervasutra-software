const EmployeeProfile = require("../models/EmployeeProfile");

// ✅ CREATE or UPDATE PROFILE
exports.saveProfile = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required" });
    }

    const profile = await EmployeeProfile.findOneAndUpdate(
      { email },
      req.body,
      {
        new: true,
        upsert: true, // create if not exists
      }
    );

    res.status(200).json({
      message: "Profile saved successfully",
      profile,
    });
  } catch (error) {
    console.error("Save profile error:", error);
    res.status(500).json({
      message: "Failed to save profile",
      error: error.message,
    });
  }
};

// ✅ GET PROFILE BY EMAIL
exports.getProfileByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const profile = await EmployeeProfile.findOne({ email });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Fetch profile error:", error);
    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};
