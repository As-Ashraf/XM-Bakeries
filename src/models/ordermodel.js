const pool = require('../db');

async function createOrder({ customer_id, status, delivery_location, items }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const orderResult = await client.query(
      'INSERT INTO orders (customer_id, status, delivery_location) VALUES ($1, $2, $3) RETURNING *',
      [customer_id, status || 'Pending', delivery_location || null]
    );
    const order = orderResult.rows[0];

    for (const item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order.id, item.product_id, item.quantity, item.price]
      );
      // Update product inventory
      await client.query(
        'UPDATE products SET quantity = quantity - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }
    await client.query('COMMIT');
    return order;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

async function getOrderById(id) {
  const order = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
  const items = await pool.query(
    'SELECT oi.*, p.name FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE order_id = $1',
    [id]
  );
  return { ...order.rows[0], items: items.rows };
}

async function getOrders() {
  const { rows } = await pool.query('SELECT * FROM orders');
  return rows;
}

async function updateOrderStatus(id, status, delivery_location) {
  const { rows } = await pool.query(
    'UPDATE orders SET status = $1, delivery_location = $2 WHERE id = $3 RETURNING *',
    [status, delivery_location, id]
  );
  return rows[0];
}

async function deleteOrder(id) {
  await pool.query('DELETE FROM orders WHERE id = $1', [id]);
}

async function getSalesReport() {
  const { rows } = await pool.query(`
    SELECT p.name, SUM(oi.quantity) as total_sold, SUM(oi.price * oi.quantity) as total_revenue
    FROM order_items oi JOIN products p ON oi.product_id = p.id
    GROUP BY p.name
    ORDER BY total_revenue DESC
  `);
  return rows;
}

async function getInventoryReport() {
  const { rows } = await pool.query('SELECT id, name, quantity FROM products ORDER BY name');
  return rows;
}

module.exports = {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  deleteOrder,
  getSalesReport,
  getInventoryReport,
};
