//SQL Database Creation

//User Table
CREATE TABLE User(
    user_id INT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role ENUM('admin', 'user'),
    created_at DATETIME,
    updated_at DATETIME
);

//Categories Table
CREATE TABLE Categories(
    category_id INT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

//Items Table
CREATE TABLE Items(
    item_id INT PRIMARY KEY,
    SKU VARCHAR(50) UNIQUE,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2),
    size ENUM('small', 'medium', 'large'),
    weight DECIMAL(10, 2), 
    slug VARCHAR(100) UNIQUE, 
    quantity INT,
    category_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

//Orders Table
CREATE TABLE Orders(
    order_id INT PRIMARY KEY,
    user_id INT,
    item_id INT,
    order_date DATETIME,
    quantity INT,
    total_price DECIMAL(10, 2),
    status ENUM('pending', 'approved', 'disapproved'),
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (item_id) REFERENCES Items(item_id)
);

//Billing Table
CREATE TABLE Billing (
    billing_id INT PRIMARY KEY,
    user_id INT,
    address VARCHAR(255),
    payment_method ENUM('credit_card', 'paypal', 'bank_transfer'),
    payment_status ENUM('pending', 'paid', 'failed'),
    total_amount DECIMAL(10, 2),
    order_id INT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

//Checkout Table
CREATE TABLE Checkout (
    checkout_id INT PRIMARY KEY,
    order_id INT,
    checkout_status ENUM('initiated', 'completed', 'failed'),
    transaction_id VARCHAR(100),
    transaction_date DATETIME,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

//SQL Commands for Inserting Records

//Insert into Uesrs
INSERT INTO Users (user_id, username, email, role, created_at, updated_at)
VALUES (1, 'john_doe', 'john@example.com', 'user', NOW(), NOW());

//Insert Data into Orders Table
INSERT INTO Orders (order_id, user_id, item_id, order_date, quantity, total_price, status, created_at, updated_at)
VALUES (101, 1, 202, NOW(), 2, 50.00, 'pending', NOW(), NOW());

//Get Data from Multiple Tables using JOIN
SELECT Users.username, Items.name, Orders.quantity, Orders.status
FROM Orders
JOIN Users ON Orders.user_id = Users.user_id
JOIN Items ON Orders.item_id = Items.item_id;

//Update Order Status
UPDATE Orders
SET status = 'approved', updated_at = NOW()
WHERE order_id = 101;

//Delete orders
DELETE FROM Orders WHERE order_id = 101;

// // //Insert into Items
// // INSERT INTO Items (item_name, item_description, item_price, item_size, item_category) VALUES('Laptop', 'High performance laptop', 1000.00, 'medium', 1);
// // INSERT INTO Items (item_name, item_description, item_price, item_size, item_category) VALUES('Sofa', 'Comfortable sofa', 500.00, 'large', 2);

// // //Insert into Orders
// // INSERT INTO Orders (order_date, order_user, order_item, status) VALUES('2021-01-01', 2, 1, 'pending');

// //SQL Commands for Queries and Joins

// //Query all items and their categories
// SELECT Items.name AS ItemName, Item.price, Categories.name AS CategoryName
// FROM Items
// JOIN Categories ON Items.category_id = Categories.category_id;

// //Update an item's price and order status
// UPDATE Items SET price = 1200.00 WHERE item_id = 1;
// UPDATE Orders SET status = 'approved' WHERE order_id = 1;
