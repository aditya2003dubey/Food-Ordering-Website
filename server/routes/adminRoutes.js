import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  addFood,
  updateFood,
  deleteFood,
} from "../controllers/adminController.js";

const router = express.Router();

router.post(
  "/food",
  protect,
  adminMiddleware,
  addFood
);

router.put(
  "/food/:id",
  protect,
  adminMiddleware,
  updateFood
);

router.delete(
  "/food/:id",
  protect,
  adminMiddleware,
  deleteFood
);

router.get(
  "/dashboard",
  protect,
  adminMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

export default router;