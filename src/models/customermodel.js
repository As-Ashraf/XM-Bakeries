const pool = require('../db');

async function getCustomers() {
  const { rows } = await pool.query('SELECT * FROM customers');
  return rows;
}

async function getCustomerById(id) {
  const { rows } = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
  return rows[0];
}

async function createCustomer({ name, email, phone, address }) {
  const { rows } = await pool.query(
    'INSERT INTO customers (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, phone, address]
  );
  return rows[0];
}

async function updateCustomer(id, { name, email, phone, address }) {
  const { rows } = await pool.query(
    'UPDATE customers SET name=$1, email=$2, phone=$3, address=$4 WHERE id=$5 RETURNING *',
    [name, email, phone, address, id]
  );
  return rows[0];
}

async function deleteCustomer(id) {
  await pool.query('DELETE FROM customers WHERE id = $1', [id]);
}

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
