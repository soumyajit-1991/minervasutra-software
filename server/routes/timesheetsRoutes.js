const express = require("express");
const router = express.Router();
const controller = require("../controllers/timesheetController");

router.post("/", controller.createTimesheet);
router.get("/", controller.getTimesheets);

module.exports = router;
