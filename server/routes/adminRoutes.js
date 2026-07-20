import express from "express";
import protect from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/upload.js";
import { addFood,updateFood,deleteFood,getDashboard,getAllOrders, updateOrderStatus } from "../controllers/adminController.js";

const router = express.Router();

router.post(
  "/food",
  protect,
  adminMiddleware,
  upload.single("image"),
  addFood
);

router.put(
  "/food/:id",
  protect,
  adminMiddleware,
  upload.single("image"),
  updateFood
);

router.delete(
  "/food/:id",
  protect,
  adminMiddleware,
  deleteFood
);


router.get(
  "/orders",
  protect,
  adminMiddleware,
  getAllOrders
);

router.put(
  "/orders/:id",
  protect,
  adminMiddleware,
  updateOrderStatus
);

router.get(
  "/dashboard",
  protect,
  adminMiddleware,
  getDashboard
)

export default router;