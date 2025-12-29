const express = require("express");
const router = express.Router();
const {
  saveProfile,
  getProfileByEmail,
} = require("../controllers/employeeProfileController");

router.post("/save", saveProfile);
router.get("/:email", getProfileByEmail);

module.exports = router;
