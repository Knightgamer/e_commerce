// models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number, // Selling price
  costPrice: Number, // Cost price
  sold: { type: Boolean, default: false },
  // other fields...
});

module.exports = mongoose.model("Item", itemSchema);
