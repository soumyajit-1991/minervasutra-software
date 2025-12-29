const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true
    },
    clientEmail: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Done"],
      default: "Pending"
    },
    amount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment_cyber", paymentSchema);
