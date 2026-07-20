import Cart from "../models/cartModel.js";

// Add Item to Cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let item = await Cart.findOne({
      user: userId,
      product: productId,
    });

    if (item) {
      item.quantity += quantity || 1;
      await item.save();

      return res.json({
        success: true,
        message: "Cart Updated",
        cart: item,
      });
    }

    item = await Cart.create({
      user: userId,
      product: productId,
      quantity: quantity || 1,
    });

    res.status(201).json({
      success: true,
      message: "Added to Cart",
      cart: item,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.params.userId,
    }).populate("product");

    const validCart = cart.filter(item => item.product);

    res.json({
      success: true,
      cart: validCart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Quantity
export const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    res.json({
      success: true,
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Item
export const removeCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Item Removed",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};