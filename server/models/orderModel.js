// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  customerName: String,
  paymentStatus: { type: String, default: "Pending" },
  // Add more fields as needed (like address, quantity, etc.)
});

module.exports = mongoose.model("Order", orderSchema);
