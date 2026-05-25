const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const order = await Order.createOrder(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: 'Error creating order', details: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.getOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching order' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.updateOrderStatus(req.params.id, req.body.status, req.body.delivery_location);
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: 'Error updating order status' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.deleteOrder(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting order' });
  }
};

exports.salesReport = async (req, res) => {
  try {
    const report = await Order.getSalesReport();
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching sales report' });
  }
};

exports.inventoryReport = async (req, res) => {
  try {
    const report = await Order.getInventoryReport();
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching inventory report' });
  }
};
