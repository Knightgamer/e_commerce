const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  // Add more fields as needed
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
