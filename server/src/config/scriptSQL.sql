CREATE TABLE categories(
    category_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE products(
    product_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(255),
    in_stock BOOLEAN,
    discount DECIMAL(5,2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    category_id INT,
    CONSTRAINT fk1_category FOREIGN KEY (category_id) REFERENCES categories (category_id)
);

