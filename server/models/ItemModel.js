const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  // Add more fields as needed
});

module.exports = mongoose.model("Item", itemSchema);
