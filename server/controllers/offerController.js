// const Offer = require('../models/Offer');
// const Candidate = require('../models/Candidate');

// // Get all offers
// const getOffers = async (req, res) => {
//   try {
//     const offers = await Offer.find()
//       .populate('candidateId', 'name email phone position')
//       .sort({ createdAt: -1 });
//     res.json(offers);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get offer by ID
// const getOfferById = async (req, res) => {
//   try {
//     const offer = await Offer.findById(req.params.id)
//       .populate('candidateId', 'name email phone position');
//     if (!offer) {
//       return res.status(404).json({ error: 'Offer not found' });
//     }
//     res.json(offer);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Create new offer
// const createOffer = async (req, res) => {
//   try {
//     // Generate offer ID
//     const count = await Offer.countDocuments();
//     const offerId = `OFR-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;
    
//     const offer = new Offer({
//       ...req.body,
//       offerId
//     });
    
//     const savedOffer = await offer.save();
    
//     // Update candidate stage
//     if (req.body.candidateId) {
//       await Candidate.findByIdAndUpdate(
//         req.body.candidateId,
//         { 
//           stage: 'Offer',
//           nextStep: 'Awaiting offer response'
//         }
//       );
//     }
    
//     res.status(201).json(savedOffer);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Update offer
// const updateOffer = async (req, res) => {
//   try {
//     const offer = await Offer.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     ).populate('candidateId', 'name email phone position');
    
//     if (!offer) {
//       return res.status(404).json({ error: 'Offer not found' });
//     }
    
//     res.json(offer);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Delete offer
// const deleteOffer = async (req, res) => {
//   try {
//     const offer = await Offer.findByIdAndDelete(req.params.id);
//     if (!offer) {
//       return res.status(404).json({ error: 'Offer not found' });
//     }
//     res.json({ message: 'Offer deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get offer statistics
// const getOfferStats = async (req, res) => {
//   try {
//     const totalOffers = await Offer.countDocuments();
//     const pending = await Offer.countDocuments({ status: 'Pending' });
//     const accepted = await Offer.countDocuments({ status: 'Accepted' });
//     const declined = await Offer.countDocuments({ status: 'Declined' });
//     const withdrawn = await Offer.countDocuments({ status: 'Withdrawn' });
//     const expired = await Offer.countDocuments({ status: 'Expired' });
    
//     res.json({
//       totalOffers,
//       pending,
//       accepted,
//       declined,
//       withdrawn,
//       expired
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Update offer status
// const updateOfferStatus = async (req, res) => {
//   try {
//     const { status, notes } = req.body;
    
//     const offer = await Offer.findByIdAndUpdate(
//       req.params.id,
//       { 
//         status,
//         notes: notes || offer.notes
//       },
//       { new: true, runValidators: true }
//     );
    
//     if (!offer) {
//       return res.status(404).json({ error: 'Offer not found' });
//     }
    
//     // Update candidate stage based on offer status
//     if (offer.candidateId) {
//       let newStage = '';
//       let nextStep = '';
      
//       switch (status) {
//         case 'Accepted':
//           newStage = 'Hired';
//           nextStep = 'Begin onboarding process';
//           break;
//         case 'Declined':
//           newStage = 'Rejected';
//           nextStep = 'Candidate declined offer';
//           break;
//         case 'Withdrawn':
//           newStage = 'Rejected';
//           nextStep = 'Offer withdrawn by company';
//           break;
//         case 'Expired':
//           newStage = 'Rejected';
//           nextStep = 'Offer expired';
//           break;
//         default:
//           newStage = 'Offer';
//           nextStep = 'Awaiting offer response';
//       }
      
//       await Candidate.findByIdAndUpdate(
//         offer.candidateId,
//         { stage: newStage, nextStep }
//       );
//     }
    
//     res.json(offer);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Add negotiation history
// const addNegotiationHistory = async (req, res) => {
//   try {
//     const { changes, initiatedBy, status } = req.body;
    
//     const offer = await Offer.findById(req.params.id);
//     if (!offer) {
//       return res.status(404).json({ error: 'Offer not found' });
//     }
    
//     offer.negotiationHistory.push({
//       changes,
//       initiatedBy,
//       status
//     });
    
//     await offer.save();
//     res.json(offer);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = {
//   getOffers,
//   getOfferById,
//   createOffer,
//   updateOffer,
//   deleteOffer,
//   getOfferStats,
//   updateOfferStatus,
//   addNegotiationHistory
// };



const Offer = require('../models/Offer');
const Candidate = require('../models/Candidate');

// ==========================
// GET ALL OFFERS
// ==========================
exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find()
      .populate('candidateId', 'name email phone position')
      .sort({ createdAt: -1 });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==========================
// GET OFFER BY ID
// ==========================
exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id)
      .populate('candidateId', 'name email phone position');

    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    res.json(offer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==========================
// CREATE OFFER ✅ FIXED
// ==========================
exports.createOffer = async (req, res) => {
  try {
    const {
      candidateId,
      department,
      salary,
      bonus,
      offerDate,
      expiryDate,
      startDate,
      benefits,
      recruiter,
      notes,
      status
    } = req.body;

    // 🔴 Validate required fields
    if (!candidateId || !department || !salary || !expiryDate || !startDate || !recruiter) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // 🔹 Fetch candidate
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    // 🔹 Generate Offer ID
    const count = await Offer.countDocuments();
    const offerId = `OFR-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;

    const responseDeadline = new Date(expiryDate);

    const offer = new Offer({
      offerId,
      candidateId,
      candidateName: candidate.name,
      candidateAvatar: candidate.avatar || '',
      position: candidate.position,
      department,
      salary,
      bonus,
      offerDate: offerDate ? new Date(offerDate) : new Date(),
      expiryDate: new Date(expiryDate),
      startDate: new Date(startDate),
      responseDeadline,
      benefits,
      recruiter,
      notes,
      status
    });

    const savedOffer = await offer.save();

    // 🔹 Update candidate stage
    await Candidate.findByIdAndUpdate(candidateId, {
      stage: 'Offer',
      nextStep: 'Awaiting offer response'
    });

    res.status(201).json(savedOffer);
  } catch (error) {
    console.error('Create offer error:', error);
    res.status(400).json({ error: error.message });
  }
};

// ==========================
// UPDATE OFFER
// ==========================
exports.updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    res.json(offer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ==========================
// DELETE OFFER
// ==========================
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }
    res.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
