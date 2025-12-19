// models/Expense.js
const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    expenseId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    vendor: { type: String, default: "", trim: true },
    paymentMethod: { type: String, default: "", trim: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
    paid: { type: Number, required: true, min: 0 },
    due: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Partial"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);

