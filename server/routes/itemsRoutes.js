const express = require("express");
const router = express.Router();
const itemController = require("../controller/itemController");

// Place specific routes before parameterized routes
router.get("/financial-summary", itemController.getFinancialSummary);
// Route for purchasing an item
router.patch("/:id/buy", itemController.purchaseItem);
// Create a new item
router.post("/", itemController.createItem);

// Get all items
router.get("/", itemController.getAllItems);

// Get a single item by ID
router.get("/:id", itemController.getItemById);

// Update an item
router.put("/:id", itemController.updateItem);

// Delete an item
router.delete("/:id", itemController.deleteItem);

// Mark an item as sold
router.patch("/:id/sold", itemController.markAsSold);

module.exports = router;
