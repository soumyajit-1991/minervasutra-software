const Negotiation = require("../models/Negotiation");

// Generate custom ID (e.g., NEG001)
const generateNegotiationId = async () => {
      const lastNegotiation = await Negotiation.findOne().sort({ createdAt: -1 });
      if (!lastNegotiation) return "NEG001";

      const lastIdNum = parseInt(lastNegotiation.negotiationId.replace("NEG", ""));
      return `NEG${String(lastIdNum + 1).padStart(3, "0")}`;
};

// Get all negotiations
exports.getAllNegotiations = async (req, res) => {
      try {
            const negotiations = await Negotiation.find().sort({ createdAt: -1 });
            res.json(negotiations);
      } catch (err) {
            res.status(500).json({ message: err.message });
      }
};

// Create a new negotiation
exports.createNegotiation = async (req, res) => {
      try {
            const negotiationId = await generateNegotiationId();
            const newNegotiation = new Negotiation({
                  negotiationId,
                  ...req.body
            });

            const savedNegotiation = await newNegotiation.save();
            res.status(201).json(savedNegotiation);
      } catch (err) {
            res.status(400).json({ message: err.message });
      }
};

// Update a negotiation
exports.updateNegotiation = async (req, res) => {
      try {
            const updatedNegotiation = await Negotiation.findOneAndUpdate(
                  { negotiationId: req.params.id },
                  req.body,
                  { new: true }
            );
            if (!updatedNegotiation) return res.status(404).json({ message: "Negotiation not found" });
            res.json(updatedNegotiation);
      } catch (err) {
            res.status(400).json({ message: err.message });
      }
};

// Delete a negotiation
exports.deleteNegotiation = async (req, res) => {
      try {
            const deletedNegotiation = await Negotiation.findOneAndDelete({ negotiationId: req.params.id });
            if (!deletedNegotiation) return res.status(404).json({ message: "Negotiation not found" });
            res.json({ message: "Negotiation deleted successfully" });
      } catch (err) {
            res.status(500).json({ message: err.message });
      }
};
