//supplierController.js
const Supplier = require("../models/Supplier.js");

// @desc Get all suppliers
// @route GET /api/suppliers
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add a new supplier
// @route POST /api/suppliers
exports.addSupplier = async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    const savedSupplier = await supplier.save();
    res.status(201).json(savedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Update supplier
// @route PUT /api/suppliers/:id
exports.updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedSupplier) return res.status(404).json({ message: "Supplier not found" });
    res.json(updatedSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Delete supplier
// @route DELETE /api/suppliers/:id
exports.deleteSupplier = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) return res.status(404).json({ message: "Supplier not found" });
    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
