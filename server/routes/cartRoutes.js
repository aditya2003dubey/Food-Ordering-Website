import express from "express";

import {
  addToCart,
  getCart,
  updateCart,
  removeCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Add Item
router.post("/add", addToCart);

// Get User Cart
router.get("/:userId", getCart);

// Update Quantity
router.put("/:id", updateCart);

// Remove Item
router.delete("/:id", removeCart);

export default router;