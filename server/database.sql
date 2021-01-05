CREATE DATABASE shopping_site;

CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE product (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  product_price INTEGER NOT NULL,
  product_date DATE NOT NULL,
  product_category VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES users(user_id),
  product_image VARCHAR(255) NOT NULL
);

CREATE TABLE cart (
  cart_id SERIAL PRIMARY KEY,
  cart_status VARCHAR(8) NOT NULL,
  user_id UUID REFERENCES users(user_id)
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  order_date DATE NOT NULL,
  cart_id INTEGER REFERENCES cart(cart_id)
);

CREATE TABLE cart_product (
  cart_id INTEGER REFERENCES cart(cart_id),
  product_id INTEGER REFERENCES product(product_id),
  PRIMARY KEY (cart_id, product_id)
);