//controllers/CustomerOrder.js
const CustomerOrder = require('../models/CustomerOrder');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await CustomerOrder.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await CustomerOrder.findOne({ orderId: req.params.id });
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
    const { orderId, date, customer, amount, status, deliveryDate, products } = req.body;

    // Validate required fields
    if (!orderId || !date || !customer || !amount || !deliveryDate || !products) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate products array
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products array is required and cannot be empty' });
    }

    const order = new CustomerOrder({
      orderId,
      date,
      customer,
      amount,
      status,
      deliveryDate,
      products
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { date, customer, amount, status, deliveryDate, products } = req.body;

    const updateData = {};
    if (date) updateData.date = date;
    if (customer) updateData.customer = customer;
    if (amount) updateData.amount = amount;
    if (status) updateData.status = status;
    if (deliveryDate) updateData.deliveryDate = deliveryDate;
    if (products) updateData.products = products;

    const order = await CustomerOrder.findOneAndUpdate(
      { orderId: req.params.id },
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
    const order = await CustomerOrder.findOneAndDelete({ orderId: req.params.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};