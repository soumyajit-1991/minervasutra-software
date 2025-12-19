const Compliance = require("../models/Compliance");

exports.getCompliances = async (req, res) => {
      try {
            const compliances = await Compliance.find().sort({ createdAt: -1 });
            res.status(200).json(compliances);
      } catch (error) {
            res.status(500).json({ message: "Error fetching compliance data", error: error.message });
      }
};

exports.createCompliance = async (req, res) => {
      try {
            const newCompliance = new Compliance(req.body);
            const saved = await newCompliance.save();
            res.status(201).json(saved);
      } catch (error) {
            res.status(500).json({ message: "Error creating compliance requirement", error: error.message });
      }
};

exports.updateCompliance = async (req, res) => {
      try {
            const updated = await Compliance.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated) return res.status(404).json({ message: "Compliance requirement not found" });
            res.status(200).json(updated);
      } catch (error) {
            res.status(500).json({ message: "Error updating compliance requirement", error: error.message });
      }
};

exports.deleteCompliance = async (req, res) => {
      try {
            const deleted = await Compliance.findByIdAndDelete(req.params.id);
            if (!deleted) return res.status(404).json({ message: "Compliance requirement not found" });
            res.status(200).json({ message: "Compliance requirement deleted successfully" });
      } catch (error) {
            res.status(500).json({ message: "Error deleting compliance requirement", error: error.message });
      }
};
