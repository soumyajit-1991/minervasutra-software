const express = require("express");
const router = express.Router();
const Client = require("../models/client");

// CREATE CLIENT
router.post("/", async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET ALL CLIENTS
router.get("/", async (req, res) => {
  const clients = await Client.find().sort({ createdAt: -1 });
  res.json(clients);
});

module.exports = router;
