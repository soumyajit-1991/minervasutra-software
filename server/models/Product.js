// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      unique: true, // Keep unique constraint
      // Remove 'required: true' to allow auto-generation
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    single: {
      type: Number,
      required: true,
    },
    priceFull: {
      type: Number,
      required: true,
    },
    priceSingle: {
      type: Number,
      required: true,
    },
    mfg: {
      type: Date,
      required: true,
    },
    exp: {
      type: Date,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Generate productId before save
productSchema.pre("save", async function (next) {
  if (!this.productId) {
    const count = await mongoose.model("Product").countDocuments();
    this.productId = `PRO${String(count + 1).padStart(3, "0")}`;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;