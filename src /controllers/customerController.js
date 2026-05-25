const Customer = require('../models/customerModel');

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.getCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching customers' });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.getCustomerById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching customer' });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: 'Error creating customer' });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.updateCustomer(req.params.id, req.body);
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: 'Error updating customer' });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteCustomer(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting customer' });
  }
};
