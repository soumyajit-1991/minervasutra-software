const express = require("express");
const router = express.Router();
const { createEvent, getEmployeeEvents } = require("../controllers/eventController");

router.post("/", createEvent);
router.get("/employee/:email", getEmployeeEvents);

module.exports = router;
