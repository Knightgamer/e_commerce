const express = require("express");
const router = express.Router();
const itemController = require("../controller/itemController");

router.post("/", itemController.createItem);
router.get("/", itemController.getAllItems);
router.get("/:id", itemController.getItemById);
router.put("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);
router.patch("/:id/sold", itemController.markAsSold);

module.exports = router;
