const express = require("express");
const router = express.Router();

const {
  getTasksByEmployee,
} = require("../controllers/taskController");

router.get("/employee/:email", getTasksByEmployee);

module.exports = router;
