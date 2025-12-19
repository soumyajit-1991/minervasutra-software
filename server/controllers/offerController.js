const Offer = require('../models/Offer');

// Generate custom ID like OFF001
const generateOfferId = async () => {
      const lastOffer = await Offer.findOne({}, { offerId: 1 }).sort({ createdAt: -1 });
      let nextId = 1;
      if (lastOffer && lastOffer.offerId) {
            const lastIdNum = parseInt(lastOffer.offerId.replace('OFF', ''), 10);
            if (!isNaN(lastIdNum)) {
                  nextId = lastIdNum + 1;
            }
      }
      return `OFF${String(nextId).padStart(3, '0')}`;
};

exports.getAllOffers = async (req, res) => {
      try {
            const offers = await Offer.find().sort({ createdAt: -1 });
            res.status(200).json(offers);
      } catch (error) {
            res.status(500).json({ message: 'Error fetching offers', error: error.message });
      }
};

exports.getOfferById = async (req, res) => {
      try {
            const { id } = req.params;
            const offer = await Offer.findOne({ offerId: id });

            if (!offer) {
                  return res.status(404).json({ message: 'Offer not found' });
            }

            res.status(200).json(offer);
      } catch (error) {
            res.status(500).json({ message: 'Error fetching offer', error: error.message });
      }
};

exports.createOffer = async (req, res) => {
      try {
            const offerId = await generateOfferId();
            const newOffer = new Offer({
                  offerId,
                  ...req.body
            });

            const savedOffer = await newOffer.save();
            res.status(201).json(savedOffer);
      } catch (error) {
            res.status(500).json({ message: 'Error creating offer', error: error.message });
      }
};

exports.updateOffer = async (req, res) => {
      try {
            const { id } = req.params;
            const updates = req.body;

            const offer = await Offer.findOneAndUpdate(
                  { offerId: id },
                  { ...updates, updatedAt: Date.now() },
                  { new: true }
            );

            if (!offer) {
                  return res.status(404).json({ message: 'Offer not found' });
            }

            res.status(200).json(offer);
      } catch (error) {
            res.status(500).json({ message: 'Error updating offer', error: error.message });
      }
};

exports.deleteOffer = async (req, res) => {
      try {
            const { id } = req.params;
            const offer = await Offer.findOneAndDelete({ offerId: id });

            if (!offer) {
                  return res.status(404).json({ message: 'Offer not found' });
            }

            res.status(200).json({ message: 'Offer deleted successfully' });
      } catch (error) {
            res.status(500).json({ message: 'Error deleting offer', error: error.message });
      }
};
