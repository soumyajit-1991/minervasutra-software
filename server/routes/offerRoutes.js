// const express = require('express');
// const router = express.Router();
// const {
//   getOffers,
//   getOfferById,
//   createOffer,
//   updateOffer,
//   deleteOffer,
//   getOfferStats,
//   updateOfferStatus,
//   addNegotiationHistory
// } = require('../controllers/offerController');

// // GET /api/offers - Get all offers
// router.get('/', getOffers);

// // GET /api/offers/stats - Get offer statistics
// router.get('/stats', getOfferStats);

// // GET /api/offers/:id - Get offer by ID
// router.get('/:id', getOfferById);

// // POST /api/offers - Create new offer
// router.post('/', createOffer);

// // PUT /api/offers/:id - Update offer
// router.put('/:id', updateOffer);

// // PUT /api/offers/:id/status - Update offer status
// router.put('/:id/status', updateOfferStatus);

// // POST /api/offers/:id/negotiation - Add negotiation history
// router.post('/:id/negotiation', addNegotiationHistory);

// // DELETE /api/offers/:id - Delete offer
// router.delete('/:id', deleteOffer);

// module.exports = router;



const express = require('express');
const router = express.Router();

const {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer
} = require('../controllers/offerController');

router.get('/', getOffers);
router.get('/:id', getOfferById);
router.post('/', createOffer);
router.put('/:id', updateOffer);
router.delete('/:id', deleteOffer);

module.exports = router;
