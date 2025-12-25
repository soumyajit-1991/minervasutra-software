// const mongoose = require('mongoose');

// const certificationSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   employee: { type: String, required: true },
//   category: { type: String, enum: ['Professional License', 'Professional Certification', 'Specialized Training'], default: 'Professional Certification' },
//   issuer: { type: String, required: true },
//   issueDate: { type: Date, required: true },
//   expiryDate: { type: Date, required: true },
//   status: { type: String, enum: ['Active', 'Expiring Soon', 'Expired'], default: 'Active' },
//   certificateNumber: { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Certification', certificationSchema);

const mongoose = require('mongoose');
const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employee: { type: String, required: true },
  category: {
    type: String,
    enum: ['Professional License', 'Professional Certification', 'Specialized Training'],
    default: 'Professional Certification'
  },
  issuer: { type: String, required: true },
  issueDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Active', 'Expiring Soon', 'Expired'],
    default: 'Active'
  },
  certificateNumber: { type: String },

  // ✅ NEW FIELD
  certificateImage: {
    type: String,
    default: null
  },

  createdAt: { type: Date, default: Date.now }
});

 module.exports = mongoose.model('Certification', certificationSchema);
