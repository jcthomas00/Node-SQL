USE bamazon;

INSERT INTO products
(product_name, department_name, price, stock_quantity)
VALUES
("Lemonade", "Music", 13.99, 4000000),
("Like A Prayer", "Music", 13.99, 123129),
("Bananas", "Produce", 0.79, 70000000),
("Eggs", "Produce", 3.99, 13121),
("Milk", "Produce", 3.79, 111231),
("PS4 Slim", "Gaming", 199.99, 12000),
("PS4 Pro", "Gaming", 299.99, 1923),
("XBox One S", "Gaming", 199.99, 121456),
("XBox One X", "Gaming", 499.99, 1211),
("Nintendo Switch", "Gaming", 299.99, 0),
("Blue Ottoman", "Furniture", 131.22, 12),
("Pink Ottoman", "Furniture", 131.22, 20),
("Green Ottoman", "Furniture", 131.22, 11),
("LG 65-inch OLED TV", "Electronics", 3499, 1917),
("LG 55-inch OLED TV", "Electronics", 2999, 121),
("Zune HD", "Electronics", 149.99, 11332132)
;

SELECT * FROM bamazon.products;