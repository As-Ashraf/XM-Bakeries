# XM Bakeries Management Backend

Backend system for XM Bakeries using Node.js (Express) and PostgreSQL.

## Features

- Product management (CRUD, filtering, sorting)
- Order management (placing, tracking, reporting)
- Customer management
- Inventory and sales reports

## Setup

1. Copy `.env.example` to `.env` and fill in your PostgreSQL credentials.
2. Create the database and tables (see schema below).
3. Run `npm install`.
4. Start the app: `npm run dev`

## Database Schema

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  price NUMERIC(10,2) NOT NULL,
  quantity INT NOT NULL
);

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50),
  delivery_location VARCHAR(255)
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id),
  quantity INT,
  price NUMERIC(10,2)
);
```

## Endpoints

- `/products` – Manage products
- `/customers` – Manage customers
- `/orders` – Manage orders, reports

See code for full usage.
