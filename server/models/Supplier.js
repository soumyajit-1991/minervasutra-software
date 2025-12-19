//models/Supplier.js
const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    supplierId: {
      type: String,
      unique: true,
    },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    address: { type: String, required: true },
    products: [{ name: { type: String, required: true } }],
  },
  { timestamps: true }
);

// Generate supplierId before save
supplierSchema.pre("save", async function (next) {
  if (!this.supplierId) {
    const count = await mongoose.model("Supplier").countDocuments();
    this.supplierId = `SUP${String(count + 1).padStart(3, "0")}`;
  }
  next();
});

const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
