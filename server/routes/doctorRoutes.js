const express = require("express");
const {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController.js");

const router = express.Router();

router.get("/", getDoctors);
router.post("/", addDoctor);
router.put("/:id", updateDoctor);
router.delete("/:id", deleteDoctor);

module.exports = router;
