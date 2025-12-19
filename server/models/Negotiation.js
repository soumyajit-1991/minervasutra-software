const mongoose = require("mongoose");

const negotiationSchema = new mongoose.Schema({
      negotiationId: { type: String, unique: true, required: true },
      candidateName: { type: String, required: true },
      candidateAvatar: { type: String }, // URL or path
      position: { type: String, required: true },
      status: {
            type: String,
            enum: ["Active", "Approved", "Rejected"],
            default: "Active"
      },
      originalOffer: { type: String, required: true },
      counterOffer: { type: String, required: true },
      finalOffer: { type: String },
      benefits: [{ type: String }],
      notes: [{
            date: { type: String, required: true },
            author: { type: String, required: true },
            content: { type: String, required: true }
      }],
      documents: [{
            name: { type: String, required: true },
            url: { type: String, required: true }
      }],
      approvedBy: { type: String },
      approvalDate: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Negotiation", negotiationSchema);
