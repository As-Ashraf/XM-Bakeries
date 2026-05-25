const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getProducts(req.query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: 'Error creating product' });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Error updating product' });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    await Product.deleteProduct(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting product' });
  }
};
