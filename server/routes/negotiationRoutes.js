// const express = require('express');
// const router = express.Router();
// const {
//   getNegotiations,
//   getNegotiationById,
//   createNegotiation,
//   updateNegotiation,
//   deleteNegotiation,
//   addNegotiationNote,
//   updateNegotiationStatus,
//   getNegotiationStats
// } = require('../controllers/negotiationController');

// // GET /api/negotiations - Get all negotiations
// router.get('/', getNegotiations);

// // GET /api/negotiations/stats - Get negotiation statistics
// router.get('/stats', getNegotiationStats);

// // GET /api/negotiations/:id - Get negotiation by ID
// router.get('/:id', getNegotiationById);

// // POST /api/negotiations - Create new negotiation
// router.post('/', createNegotiation);

// // PUT /api/negotiations/:id - Update negotiation
// router.put('/:id', updateNegotiation);

// // PUT /api/negotiations/:id/status - Update negotiation status
// router.put('/:id/status', updateNegotiationStatus);

// // POST /api/negotiations/:id/notes - Add note to negotiation
// router.post('/:id/notes', addNegotiationNote);

// // DELETE /api/negotiations/:id - Delete negotiation
// router.delete('/:id', deleteNegotiation);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  getNegotiations,
  createNegotiation,
  updateNegotiation,
  deleteNegotiation,
  getNegotiationStats,
} = require("../controllers/negotiationController");

router.get("/", getNegotiations);
router.get("/stats", getNegotiationStats);
router.post("/", createNegotiation);
router.put("/:id", updateNegotiation);
router.delete("/:id", deleteNegotiation);

module.exports = router;
