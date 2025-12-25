// const mongoose = require('mongoose');

// const expenseSchema = new mongoose.Schema({
//   expenseId: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   category: {
//     type: String,
//     enum: ['Utilities', 'Salaries', 'Maintenance', 'Office Supplies', 'Training', 'Travel', 'Software', 'Equipment', 'Other'],
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   amount: {
//     type: Number,
//     required: true
//   },
//   paidAmount: {
//     type: Number,
//     default: 0
//   },
//   dueAmount: {
//     type: Number,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   },
//   dueDate: {
//     type: Date,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'Partial', 'Paid', 'Overdue', 'Cancelled'],
//     default: 'Pending'
//   },
//   paymentMethod: {
//     type: String,
//     enum: ['Bank Transfer', 'Cash', 'Cheque', 'UPI', 'Credit Card', 'Debit Card'],
//     default: 'Bank Transfer'
//   },
//   vendor: {
//     type: String,
//     required: true
//   },
//   department: {
//     type: String,
//     required: true
//   },
//   approvedBy: {
//     type: String,
//     default: ''
//   },
//   approvalDate: {
//     type: Date,
//     default: null
//   },
//   receipts: [{
//     filename: String,
//     url: String,
//     uploadDate: { type: Date, default: Date.now }
//   }],
//   notes: {
//     type: String,
//     default: ''
//   },
//   recurring: {
//     isRecurring: { type: Boolean, default: false },
//     frequency: { type: String, enum: ['Monthly', 'Quarterly', 'Annually'] },
//     nextDueDate: Date
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Expense', expenseSchema);


// const mongoose = require("mongoose");

// const expenseSchema = new mongoose.Schema(
//   {
//     expenseId: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     category: {
//       type: String,
//       enum: [
//         "Utilities",
//         "Salaries",
//         "Maintenance",
//         "Office Supplies",
//         "Training",
//         "Travel",
//         "Software",
//         "Equipment",
//         "Other",
//       ],
//       required: true,
//     },
//     description: { type: String, required: true },
//     vendor: { type: String, required: true },
//     department: { type: String, required: true },

//     amount: { type: Number, required: true },
//     paidAmount: { type: Number, default: 0 },
//     dueAmount: { type: Number, required: true },

//     status: {
//       type: String,
//       enum: ["Pending", "Partial", "Paid", "Overdue", "Cancelled"],
//       default: "Pending",
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["Bank Transfer", "Cash", "Cheque", "UPI", "Credit Card", "Debit Card"],
//       default: "Bank Transfer",
//     },

//     date: { type: Date, default: Date.now },
//     dueDate: { type: Date, required: true },

//     notes: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Expense", expenseSchema);


const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    expenseId: {
      type: String,
      required: true,
      unique: true,
    },

    // ❌ REMOVED category
    // ❌ REMOVED vendor

    description: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paidAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    dueAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Partial", "Paid"],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      default: "Bank Transfer",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
