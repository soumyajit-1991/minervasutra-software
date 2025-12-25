// //models/CustomerOrder.js
// const mongoose = require('mongoose');

// const CustomerOrderSchema = new mongoose.Schema({
//   orderId: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true
//   },
//   date: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   customer: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   amount: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   status: {
//     type: String,
//     required: true,
//     enum: ['Pending', 'Processing', 'Out of Delivery', 'Delivered', 'Completed'],
//     default: 'Pending'
//   },
//   deliveryDate: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   products: [{
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 1
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0
//     }
//   }],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Generate customerOrderId before save
// CustomerOrderSchema.pre("save", async function (next) {
//   if (!this.supplierId) {
//     const count = await mongoose.model("Supplier").countDocuments();
//     this.customerId = `CUS-ORD${String(count + 1).padStart(3, "0")}`;
//   }
//   next();
// });

// // Update timestamp on save
// CustomerOrderSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// module.exports = mongoose.model('CustomerOrder', CustomerOrderSchema);



const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const CustomerOrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true },
    date: { type: String, required: true },
    customer: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    doctor: { type: String },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Out of Delivery", "Delivered", "Completed"],
      default: "Pending",
    },
    deliveryMethod: { type: String },
    // deliveryDate: { type: String, required: true },
    products: [ProductSchema],
    notes: { type: String },
  },
  { timestamps: true }
);

/* AUTO ORDER ID */
CustomerOrderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    const count = await mongoose.model("CustomerOrder").countDocuments();
    this.orderId = `ORD-${String(count + 1).padStart(4, "0")}`;
  }
  next();
});

module.exports = mongoose.model("CustomerOrder", CustomerOrderSchema);
