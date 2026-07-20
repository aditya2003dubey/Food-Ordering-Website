import Food from "../models/Food.js";
import Order from "../models/orderModel.js"
import User from "../models/User.js"

// Add Food
export const addFood = async (req, res) => {
  try {
    const food = await Food.create({
      ...req.body,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      success: true,
      message: "Food Added Successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Food
export const deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Food Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Food
export const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    food.name = req.body.name;
    food.price = req.body.price;
    food.category = req.body.category;
    food.description = req.body.description;

    // Agar nayi image upload hui hai to update karo
    if (req.file) {
      food.image = req.file.path;
    }

    await food.save();

    res.json({
      success: true,
      message: "Food Updated Successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = req.body.status;

    await order.save();

    res.json({
      success: true,
      message: "Order Status Updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalFoods = await Food.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.json({
      success: true,
      totalUsers,
      totalFoods,
      totalOrders,
      totalRevenue,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};