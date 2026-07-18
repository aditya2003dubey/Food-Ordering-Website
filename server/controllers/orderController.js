import Order from "../models/orderModel.js";

// Place Order
export const placeOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.userId,
    }).populate("items.product");

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