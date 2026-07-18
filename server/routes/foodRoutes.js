import express from "express";
import { getFoods, addFood, updateFood, deleteFood, getFoodById} from "../controllers/foodController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getFoods);

router.get("/:id", getFoodById);

router.post("/", protect, addFood);

router.put("/:id", protect, updateFood);

router.delete("/:id", protect, deleteFood);

export default router;