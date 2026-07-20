import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { updateCart, removeCart } from "../api/cartApi";

function Cart() {
  const { cartItems, fetchCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const increaseQty = async (item) => {
    try {
      await updateCart(item._id, item.quantity + 1);
      await fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;

    try {
      await updateCart(item._id, item.quantity - 1);
      await fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await removeCart(id);
      await fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) =>
       total + item.product.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 49 : 0;
  const total = subtotal + delivery;

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-3xl font-bold text-gray-500">
          Your Cart is Empty
        </h1>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-black text-white">
            Your Cart
          </h1>

          <p className="mt-3 text-orange-100">
            Review your selected items before checkout.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-6">

            {cartItems.map((item) => (

              <div
                key={item._id}
                className="bg-white rounded-3xl shadow-lg p-6 flex gap-6 items-center"
              >

                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-28 h-28 rounded-2xl object-cover"
                />

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {item.product.name}
                  </h2>

                  <p className="text-orange-500 font-bold mt-2">
                    ₹{item.product.price}
                  </p>

                  <div className="flex items-center gap-4 mt-5">

                    <button
                      onClick={() => decreaseQty(item)}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item)}
                      className="w-10 h-10 rounded-full bg-orange-500 text-white hover:bg-orange-600"
                    >
                      +
                    </button>

                  </div>

                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 font-semibold hover:text-red-700"
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <div>

            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-28">

              <h2 className="text-2xl font-bold">
                Order Summary
              </h2>

              <div className="flex justify-between mt-8">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between mt-4">
                <span>Delivery</span>
                <span>₹{delivery}</span>
              </div>

              <hr className="my-6" />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>

                <span className="text-orange-500">
                  ₹{total}
                </span>
              </div>

              <Link
                to="/checkout"
                className="block text-center mt-8 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold"
              >
                Proceed To Checkout
              </Link>

            </div>

          </div>

        </div>
      </section>

    </>
  );
}

export default Cart;