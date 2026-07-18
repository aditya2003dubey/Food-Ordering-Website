import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api/orderApi";
import { createPaymentOrder } from "../api/paymentApi";

function Checkout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "cod",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/success");
  };

  const subtotal = 897;
  const delivery = 49;
  const gst = 18;
  const total = subtotal + delivery + gst;

  const handlePlaceOrder = async () => {

    try {

      const token = user.token;

      const order = {
        user: user._id,
        items: cartItems,
        totalAmount: totalPrice,
        paymentMethod: "Cash on Delivery",
      };

      await placeOrder(order, token);

      navigate("/success");

    } catch (error) {

      console.log(error);

      alert("Order Failed");

    }

  };

  const paymentHandler = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const order = await createPaymentOrder(
        totalPrice,
        user.token
      );

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",

        amount: order.amount,

        currency: order.currency,

        name: "BiteNest",

        description: "Food Order",

        order_id: order.id,

        handler: async function (response) {

          alert("Payment Successful");

          console.log(response);

        },

        prefill: {
          name: user.name,
          email: user.email,
        },

        theme: {
          color: "#f97316",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (error) {

      console.log(error);

    }
  };
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-black text-white">
            Checkout
          </h1>

          <p className="mt-4 text-orange-100 text-lg">
            Complete your order securely.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">

          {/* Left Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold mb-8">
              Delivery Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
                className="border rounded-xl p-4 outline-none focus:border-orange-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="border rounded-xl p-4 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                className="border rounded-xl p-4 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                className="border rounded-xl p-4 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                onChange={handleChange}
                className="border rounded-xl p-4 outline-none focus:border-orange-500"
              />

              <textarea
                rows="5"
                name="address"
                placeholder="Full Address"
                onChange={handleChange}
                className="border rounded-xl p-4 outline-none focus:border-orange-500 md:col-span-2"
              />

            </div>

            <h2 className="text-3xl font-bold mt-10 mb-6">
              Payment Method
            </h2>

            <div className="space-y-4">

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={formData.payment === "cod"}
                  onChange={handleChange}
                />
                Cash On Delivery
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={formData.payment === "upi"}
                  onChange={handleChange}
                />
                UPI Payment
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={formData.payment === "card"}
                  onChange={handleChange}
                />
                Debit / Credit Card
              </label>

            </div>

            {/* Place Order Button */}
            <button
              onClick={paymentHandler}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600"
            >
              Pay Now
            </button>

          </form>

          {/* Order Summary */}
          <div>

            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-28">

              <h2 className="text-3xl font-bold mb-8">
                Order Summary
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Delivery
                  </span>

                  <span className="font-semibold">
                    ₹{delivery}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    GST
                  </span>

                  <span className="font-semibold">
                    ₹{gst}
                  </span>
                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold">

                  <span>Total</span>

                  <span className="text-orange-500">
                    ₹{total}
                  </span>

                </div>

              </div>

              {/* Promo Code */}

              <div className="mt-8">

                <label className="font-semibold block mb-3">
                  Promo Code
                </label>

                <div className="flex gap-3">

                  <input
                    type="text"
                    placeholder="Enter Code"
                    className="flex-1 border rounded-xl px-4 py-3 outline-none focus:border-orange-500"
                  />

                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-xl"
                  >
                    Apply
                  </button>

                </div>

              </div>

              {/* Secure Payment */}

              <div className="mt-10 bg-orange-50 rounded-2xl p-5">

                <h3 className="font-bold text-lg text-orange-600">
                  🔒 Secure Checkout
                </h3>

                <p className="mt-2 text-gray-600 text-sm leading-6">
                  Your payment information is encrypted and completely secure.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </>
  );
}

export default Checkout;