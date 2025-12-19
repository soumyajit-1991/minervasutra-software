//models/SupplierOrder.js
const mongoose = require('mongoose');

const SupplierOrderSchema = new mongoose.Schema({
  supplierId: {
    type: String,
    required: true,
    trim: true
  },
  supplierName: {
    type: String,
    required: true,
    trim: true
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  products: [{
    productName: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['Order Placed', 'Order Received', 'Order Cancelled'],
    default: 'Order Placed'
  },
  deliveryAddress: {
    type: String,
    required: true,
    trim: true
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

// Generate supplierId before save
SupplierOrderSchema.pre("save", async function (next) {
  if (!this.supplierId) {
    const count = await mongoose.model("Supplier").countDocuments();
    this.supplierId = `SUP-ORD${String(count + 1).padStart(3, "0")}`;
  }
  next();
});

// Update timestamp on save
SupplierOrderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('SupplierOrder', SupplierOrderSchema);