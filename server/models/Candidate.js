const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
      candidateId: {
            type: String,
            required: true,
            unique: true
      },
      name: {
            type: String,
            required: true,
            trim: true
      },
      email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
      },
      phone: {
            type: String,
            required: true,
            trim: true
      },
      position: {
            type: String,
            required: true,
            trim: true
      },
      experience: {
            type: String,
            trim: true
      },
      appliedDate: {
            type: String, // Keeping as string to match format "YYYY-MM-DD" or similar easily
            default: () => new Date().toISOString().split('T')[0]
      },
      recruiter: {
            type: String,
            trim: true
      },
      stage: {
            type: String,
            default: 'Screening',
            enum: ['Screening', 'Phone Interview', 'Technical Interview', 'Final Interview', 'Offer', 'Rejected']
      },
      status: {
            type: String,
            default: 'Active',
            enum: ['Active', 'Rejected', 'Hired']
      },
      rating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0
      },
      nextStep: {
            type: String,
            default: 'Review Application'
      },
      avatar: {
            type: String,
            default: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' // Default placeholder
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

CandidateSchema.pre('save', function (next) {
      this.updatedAt = Date.now();
      next();
});

module.exports = mongoose.model('Candidate', CandidateSchema);
