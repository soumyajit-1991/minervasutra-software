const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    offerId: {
        type: String,
        required: true,
        unique: true
    },
    candidateName: {
        type: String,
        required: true,
        trim: true
    },
    candidateAvatar: {
        type: String,
        default: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    salary: {
        type: String,
        required: true,
        trim: true
    },
    bonus: {
        type: String,
        default: 'N/A',
        trim: true
    },
    offerDate: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    benefits: {
        type: [String],
        default: []
    },
    notes: {
        type: String,
        trim: true
    },
    recruiter: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Accepted', 'Declined']
    },
    responseDeadline: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

OfferSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Offer', OfferSchema);
