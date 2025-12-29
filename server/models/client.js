const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    days: { type: Number, required: true },
    description: String,
    address: String,
    mobile: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
