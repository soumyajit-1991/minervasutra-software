const express = require("express");
const { getCompliances, createCompliance, updateCompliance, deleteCompliance } = require("../controllers/complianceController");

const router = express.Router();

router.get("/", getCompliances);
router.post("/", createCompliance);
router.put("/:id", updateCompliance);
router.delete("/:id", deleteCompliance);

module.exports = router;
