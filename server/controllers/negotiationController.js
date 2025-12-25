// const Negotiation = require('../models/Negotiation');

// // Get all negotiations
// const getNegotiations = async (req, res) => {
//   try {
//     const negotiations = await Negotiation.find()
//       .populate('offerId', 'salary bonus benefits')
//       .populate('candidateId', 'name email phone position')
//       .sort({ createdAt: -1 });
//     res.json(negotiations);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get negotiation by ID
// const getNegotiationById = async (req, res) => {
//   try {
//     const negotiation = await Negotiation.findById(req.params.id)
//       .populate('offerId', 'salary bonus benefits')
//       .populate('candidateId', 'name email phone position');
//     if (!negotiation) {
//       return res.status(404).json({ error: 'Negotiation not found' });
//     }
//     res.json(negotiation);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Create new negotiation
// const createNegotiation = async (req, res) => {
//   try {
//     // Generate negotiation ID
//     const count = await Negotiation.countDocuments();
//     const negotiationId = `NEG-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;
    
//     const negotiation = new Negotiation({
//       ...req.body,
//       negotiationId
//     });
    
//     const savedNegotiation = await negotiation.save();
//     res.status(201).json(savedNegotiation);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Update negotiation
// const updateNegotiation = async (req, res) => {
//   try {
//     const negotiation = await Negotiation.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     ).populate('offerId', 'salary bonus benefits')
//      .populate('candidateId', 'name email phone position');
    
//     if (!negotiation) {
//       return res.status(404).json({ error: 'Negotiation not found' });
//     }
    
//     res.json(negotiation);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Delete negotiation
// const deleteNegotiation = async (req, res) => {
//   try {
//     const negotiation = await Negotiation.findByIdAndDelete(req.params.id);
//     if (!negotiation) {
//       return res.status(404).json({ error: 'Negotiation not found' });
//     }
//     res.json({ message: 'Negotiation deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Add note to negotiation
// const addNegotiationNote = async (req, res) => {
//   try {
//     const { content, author, type } = req.body;
    
//     const negotiation = await Negotiation.findById(req.params.id);
//     if (!negotiation) {
//       return res.status(404).json({ error: 'Negotiation not found' });
//     }
    
//     negotiation.notes.push({
//       content,
//       author,
//       type: type || 'Note'
//     });
    
//     // Add to timeline
//     negotiation.timeline.push({
//       event: `${type || 'Note'} added`,
//       details: content.substring(0, 100) + (content.length > 100 ? '...' : '')
//     });
    
//     await negotiation.save();
//     res.json(negotiation);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Update negotiation status
// const updateNegotiationStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
    
//     const negotiation = await Negotiation.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true, runValidators: true }
//     );
    
//     if (!negotiation) {
//       return res.status(404).json({ error: 'Negotiation not found' });
//     }
    
//     // Add to timeline
//     negotiation.timeline.push({
//       event: `Status changed to ${status}`,
//       details: `Negotiation status updated`
//     });
    
//     await negotiation.save();
//     res.json(negotiation);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Get negotiation statistics
// const getNegotiationStats = async (req, res) => {
//   try {
//     const inProgress = await Negotiation.countDocuments({ status: 'In Progress' });
//     const completed = await Negotiation.countDocuments({ status: 'Completed' });
//     const stalled = await Negotiation.countDocuments({ status: 'Stalled' });
//     const cancelled = await Negotiation.countDocuments({ status: 'Cancelled' });
    
//     res.json({
//       inProgress,
//       completed,
//       stalled,
//       cancelled,
//       total: inProgress + completed + stalled + cancelled
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   getNegotiations,
//   getNegotiationById,
//   createNegotiation,
//   updateNegotiation,
//   deleteNegotiation,
//   addNegotiationNote,
//   updateNegotiationStatus,
//   getNegotiationStats
// };


const Negotiation = require("../models/Negotiation");

// GET all
const getNegotiations = async (req, res) => {
  try {
    const negotiations = await Negotiation.find().sort({ createdAt: -1 });
    res.json(negotiations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE
const createNegotiation = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // 🔍 DEBUG

    const count = await Negotiation.countDocuments();
    const negotiationId = `NEG-${new Date().getFullYear()}-${String(count + 1).padStart(3, "0")}`;

    const negotiation = new Negotiation({
      ...req.body,
      negotiationId,
    });

    const saved = await negotiation.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("CREATE NEGOTIATION ERROR:", error);
    res.status(400).json({ error: error.message });
  }
};

// UPDATE
const updateNegotiation = async (req, res) => {
  try {
    const updated = await Negotiation.findOneAndUpdate(
      { negotiationId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Negotiation not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
const deleteNegotiation = async (req, res) => {
  try {
    const deleted = await Negotiation.findOneAndDelete({
      negotiationId: req.params.id,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Negotiation not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// STATS
const getNegotiationStats = async (req, res) => {
  try {
    const active = await Negotiation.countDocuments({ status: "Active" });
    const approved = await Negotiation.countDocuments({ status: "Approved" });
    const rejected = await Negotiation.countDocuments({ status: "Rejected" });

    res.json({
      active,
      approved,
      rejected,
      total: active + approved + rejected,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getNegotiations,
  createNegotiation,
  updateNegotiation,
  deleteNegotiation,
  getNegotiationStats,
};
