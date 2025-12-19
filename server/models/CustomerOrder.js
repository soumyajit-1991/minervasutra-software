//models/CustomerOrder.js
const mongoose = require('mongoose');

const CustomerOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  date: {
    type: String,
    required: true,
    trim: true
  },
  customer: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Processing', 'Out of Delivery', 'Delivered', 'Completed'],
    default: 'Pending'
  },
  deliveryDate: {
    type: String,
    required: true,
    trim: true
  },
  products: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Generate customerOrderId before save
CustomerOrderSchema.pre("save", async function (next) {
  if (!this.supplierId) {
    const count = await mongoose.model("Supplier").countDocuments();
    this.customerId = `CUS-ORD${String(count + 1).padStart(3, "0")}`;
  }
  next();
});

// Update timestamp on save
CustomerOrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('CustomerOrder', CustomerOrderSchema);