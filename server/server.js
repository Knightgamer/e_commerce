const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/e_commerce_db', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple model for items
const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const Item = mongoose.model('Item', itemSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/create-account', (req, res) => {
  // Create a new customer account logic
  // You can add more details like customer name, address, etc.
  res.json({ message: 'Account created successfully' });
});

app.post('/make-order', async (req, res) => {
  const { itemId, quantity } = req.body;

  // Retrieve item details
  const item = await Item.findById(itemId);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  // Check if there is enough quantity in stock
  if (item.quantity < quantity) {
    return res.status(400).json({ message: 'Not enough stock available' });
  }

  // Update item quantity
  item.quantity -= quantity;
  await item.save();

  // Calculate total cost and update total sales and capital
  const totalCost = item.price * quantity;
  // You need to have a mechanism to track total sales and capital in your application
  // For simplicity, we'll just log them for now
  console.log(`Total Sales: ${totalCost}, Total Capital Used: ${totalCost}`);

  res.json({ message: 'Order placed successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
