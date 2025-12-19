//controllers/supplierOrderController.js
const SupplierOrder = require('../models/SupplierOrder.js');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await SupplierOrder.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await SupplierOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { supplierId, supplierName, products, totalAmount, deliveryAddress } = req.body;
    
    // Validate required fields
    if (!supplierId || !supplierName || !products || !totalAmount || !deliveryAddress) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate products array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products array is required and cannot be empty' });
    }

    const order = new SupplierOrder({
      supplierId,
      supplierName,
      products,
      totalAmount,
      deliveryAddress
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { status, products, totalAmount, deliveryAddress } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (products) updateData.products = products;
    if (totalAmount) updateData.totalAmount = totalAmount;
    if (deliveryAddress) updateData.deliveryAddress = deliveryAddress;

    const order = await SupplierOrder.findByIdAndUpdate(
      req.params.id,
      { ...updateData, updatedAt: Date.now() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await SupplierOrder.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};