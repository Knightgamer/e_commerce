// models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  costPrice: Number, // Added costPrice field
  quantity: { type: Number, default: 0 },
  sold: { type: Boolean, default: false },
  // Add more fields as needed
});

module.exports = mongoose.model("Item", itemSchema);
