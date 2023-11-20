const Item = require("../models/ItemModel"); // Replace with the actual path to your Item model

const asyncHandler = require("express-async-handler");

const createItem = asyncHandler(async (req, res) => {
  try {
    const { name, price, costPrice } = req.body;
    const newItem = new Item({ name, price, costPrice });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all items
const getAllItems = asyncHandler(async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single item by ID
const getItemById = asyncHandler(async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Cannot find item" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an item
const updateItem = asyncHandler(async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Cannot find item" });
    }

    if (req.body.name != null) {
      item.name = req.body.name;
    }
    if (req.body.price != null) {
      item.price = req.body.price;
    }
    // Update other fields here

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark an item as sold
const markAsSold = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.sold = true;
    await item.save();

    res.status(200).json({ message: "Item marked as sold", item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFinancialSummary = asyncHandler(async (req, res) => {
  try {
    const items = await Item.find();
    let totalSales = 0;
    let totalCapital = 0;

    items.forEach((item) => {
      if (item.sold) {
        totalSales += item.price;
        totalCapital += item.costPrice;
      }
    });

    const profit = totalSales - totalCapital;

    res.json({ totalSales, totalCapital, profit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an item
const deleteItem = asyncHandler(async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Cannot find item" });
    }

    await item.deleteOne({ _id: item._id });
    res.json({ message: "Deleted Item" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  markAsSold,
  getFinancialSummary,
};
