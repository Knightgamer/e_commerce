const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number, // Selling price
  costPrice: Number, // Cost price
  sold: { type: Boolean, default: false },
  quantity: {
    type: Number,
    default: 0, // Default quantity, adjust as needed
  },
  initialQuantity: Number, // Add this field

  // other fields...
});

module.exports = mongoose.model("Item", itemSchema);
