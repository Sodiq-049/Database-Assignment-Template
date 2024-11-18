//NoSQL Database Structure

//User Collection
{
    "_id": ObjectId("user_id"),
    "username": "john_doe",
    "email": "john.doe@example.com",
    "role": "admin",  // or "user"
    "created_at": ISODate("2024-11-12T12:00:00Z"),
    "updated_at": ISODate("2024-11-12T12:00:00Z")
};

//Categories Collection
{
    "_id": ObjectId("category_id"),
    "name": "Electronics",
    "description": "Items related to electronics such as laptops, phones, etc.",
    "created_at": ISODate("2024-11-12T12:00:00Z"),
    "updated_at": ISODate("2024-11-12T12:00:00Z")
};

//Items Collection
{
    "_id": ObjectId("item_id"),
    "SKU": "SKU12345",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1000.00,
    "size": "medium",
    "weight": 2.5,  // weight in kilograms
    "slug": "high-performance-laptop",  // SEO-friendly URL slug
    "quantity": 50,
    "category_id": ObjectId("category_id"),  // Reference to category
    "is_active": true,
    "created_at": ISODate("2024-11-12T12:00:00Z"),
    "updated_at": ISODate("2024-11-12T12:00:00Z")
};

//Orders Collection
{
    "_id": ObjectId("order_id"),
    "user_id": ObjectId("user_id"),  // Reference to user
    "item_id": ObjectId("item_id"),  // Reference to item
    "order_date": ISODate("2024-11-12T12:00:00Z"),
    "quantity": 1,
    "total_price": 1000.00,
    "status": "pending",  // "approved" or "disapproved"
    "created_at": ISODate("2024-11-12T12:00:00Z"),
    "updated_at": ISODate("2024-11-12T12:00:00Z")
};

//Billing Collection
{
    "_id": ObjectId("billing_id"),
    "user_id": ObjectId("user_id"),  // Reference to user
    "address": "1234 Street, City, Country",
    "payment_method": "credit_card",  // or "paypal", "bank_transfer"
    "payment_status": "pending",  // "paid" or "failed"
    "total_amount": 1000.00,
    "order_id": ObjectId("order_id"),  // Reference to order
    "created_at": ISODate("2024-11-12T12:00:00Z"),
    "updated_at": ISODate("2024-11-12T12:00:00Z")
};

//Checkout Collection
{
    "_id": ObjectId("checkout_id"),
    "order_id": ObjectId("order_id"),  // Reference to order
    "checkout_status": "initiated",  // "completed" or "failed"
    "transaction_id": "txn_12345",
    "transaction_date": ISODate("2024-11-12T12:00:00Z"),
    "created_at": ISODate("2024-11-12T12:00:00Z"),
    "updated_at": ISODate("2024-11-12T12:00:00Z")
};

//NoSQL Commands for Inserting Records

//Insert Data into Users
db.Users.insertOne({
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "created_at": new Date(),
    "updated_at": new Date()
});

//Get Orders with User Details
db.Orders.aggregate([
    {
        $lookup: {
            from: "Users",
            localField: "user_id",
            foreignField: "_id",
            as: "user"
        }
    },
    {
        $unwind: "$user"
    }
]);

//Update order status
db.Orders.updateOne(
    { "_id": ObjectId("order_id") },
    { $set: { "status": "approved", "updated_at": new Date() } }
);

//Delete Order
db.Orders.deleteOne({ "_id": ObjectId("order_id") });