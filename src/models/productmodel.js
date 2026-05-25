const pool = require('../db');

// Fetch products with optional filters/sorting
async function getProducts(filters) {
  let query = 'SELECT * FROM products WHERE 1=1';
  const values = [];
  if (filters.category) {
    values.push(filters.category);
    query += ` AND category = $${values.length}`;
  }
  if (filters.minPrice) {
    values.push(filters.minPrice);
    query += ` AND price >= $${values.length}`;
  }
  if (filters.maxPrice) {
    values.push(filters.maxPrice);
    query += ` AND price <= $${values.length}`;
  }
  if (filters.minQty) {
    values.push(filters.minQty);
    query += ` AND quantity >= $${values.length}`;
  }
  if (filters.maxQty) {
    values.push(filters.maxQty);
    query += ` AND quantity <= $${values.length}`;
  }
  if (filters.sortBy) {
    const allowed = ['price', 'quantity', 'name'];
    if (allowed.includes(filters.sortBy)) {
      query += ` ORDER BY ${filters.sortBy}`;
      if (filters.order === 'desc') query += ' DESC';
      else query += ' ASC';
    }
  }
  const { rows } = await pool.query(query, values);
  return rows;
}

async function getProductById(id) {
  const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  return rows[0];
}

async function createProduct({ name, category, price, quantity }) {
  const { rows } = await pool.query(
    'INSERT INTO products (name, category, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, category, price, quantity]
  );
  return rows[0];
}

async function updateProduct(id, { name, category, price, quantity }) {
  const { rows } = await pool.query(
    'UPDATE products SET name=$1, category=$2, price=$3, quantity=$4 WHERE id=$5 RETURNING *',
    [name, category, price, quantity, id]
  );
  return rows[0];
}

async function deleteProduct(id) {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
