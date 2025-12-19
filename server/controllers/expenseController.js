const Expense = require("../models/Expense");

const generateExpenseId = async () => {
  const count = await Expense.countDocuments();
  return `EXP-${String(count + 1).padStart(3, "0")}`;
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error: error.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({ expenseId: req.params.id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expense", error: error.message });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const { category, description, vendor, paymentMethod, date, amount, paid } = req.body;

    if (!category || !date || amount === undefined || paid === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const due = Math.max(Number(amount) - Number(paid), 0);
    const status = due === 0 ? "Paid" : paid === 0 ? "Pending" : "Partial";

    const expense = new Expense({
      expenseId: await generateExpenseId(),
      category,
      description: description || "",
      vendor: vendor || "",
      paymentMethod: paymentMethod || "",
      date,
      amount,
      paid,
      due,
      status,
    });

    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Error creating expense", error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { category, description, vendor, paymentMethod, date, amount, paid, status } = req.body;

    const updateData = {};
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    if (vendor !== undefined) updateData.vendor = vendor;
    if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod;
    if (date !== undefined) updateData.date = date;
    if (amount !== undefined) updateData.amount = amount;
    if (paid !== undefined) updateData.paid = paid;
    if (amount !== undefined || paid !== undefined) {
      const amt = amount !== undefined ? Number(amount) : undefined;
      const pd = paid !== undefined ? Number(paid) : undefined;
      const current = await Expense.findOne({ expenseId: req.params.id });
      if (!current) return res.status(404).json({ message: "Expense not found" });
      const finalAmount = amt !== undefined ? amt : current.amount;
      const finalPaid = pd !== undefined ? pd : current.paid;
      updateData.due = Math.max(finalAmount - finalPaid, 0);
      updateData.status = status || (updateData.due === 0 ? "Paid" : finalPaid === 0 ? "Pending" : "Partial");
    } else if (status) {
      updateData.status = status;
    }

    const expense = await Expense.findOneAndUpdate(
      { expenseId: req.params.id },
      { ...updateData, updatedAt: Date.now() },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ expenseId: req.params.id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error: error.message });
  }
};

