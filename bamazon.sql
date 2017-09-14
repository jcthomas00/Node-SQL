CREATE DATABASE IF NOT EXISTS bamazon;

DROP TABLE IF EXISTS products; -- For Development Only

CREATE TABLE products(
	item_id INT(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(100),
	department_name VARCHAR(100),
	price DECIMAL (13, 2),
	stock_quantity INT(10)
);

