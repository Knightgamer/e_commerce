const Order = require("../models/orderModel");
const Item = require("../models/ItemModel");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { itemId, customerName } = req.body;

    // Validate item availability
    const item = await Item.findById(itemId);
    if (!item || item.sold) {
      return res
        .status(400)
        .json({ message: "Item not available or already sold" });
    }

    // Create new order
    const newOrder = new Order({
      item: itemId,
      customerName,
      // Add other fields from request
    });
    await newOrder.save();

    // Update item status if necessary
    // item.sold = true;
    // await item.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("item");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("item");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update fields from the request
    order.customerName = req.body.customerName || order.customerName;
    // Add other fields to update

    await order.save();
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.deleteOne({ _id: order._id });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
