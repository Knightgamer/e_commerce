// models/Item.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  sold: { type: Boolean, default: false },
  // Add more fields as needed
});

module.exports = mongoose.model("Item", itemSchema);
