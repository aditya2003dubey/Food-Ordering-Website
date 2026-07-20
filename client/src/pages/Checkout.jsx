import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api/orderApi";
import { createPaymentOrder, verifyPayment } from "../api/paymentApi";
import { useCart } from "../context/CartContext";


function Checkout() {
  const navigate = useNavigate();

  const { cartItems, fetchCart } = useCart();

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

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 49 : 0;

  const gst = Math.round(subtotal * 0.05);

  const total = subtotal + delivery + gst;

  const validateForm = () => {
    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.pincode.trim()
    ) {
      alert("Please fill all required fields.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10 digit phone number.");
      return false;
    }

    if (!/^[0-9]{6}$/.test(formData.pincode)) {
      alert("Please enter a valid 6 digit pincode.");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        user: user._id,
        items: cartItems,
        totalAmount: total,
        paymentMethod:
          formData.payment === "cod"
            ? "Cash on Delivery"
            : "Online Payment",

        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
        },
      };
      await placeOrder(orderData, user.token);

      await fetchCart();

      navigate("/success");

    } catch (error) {
      console.log(error);
      alert("Order Failed");
    }
  };

  const paymentHandler = async () => {

  if (!validateForm()) return;

  if (formData.payment === "cod") {
    await handlePlaceOrder();
    return;
  }

  try {

    const response = await createPaymentOrder(
      total,
      user.token
    );

    const order = response.order;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: "BiteNest",

      description: "Food Order",

      order_id: order.id,

      handler: async function (response) {

        try {

          console.log(response);

          const verify = await verifyPayment(response, user.token);

          if (verify.success) {

            await handlePlaceOrder();

          } else {

            alert("Payment Verification Failed");

          }

        } catch (error) {

          console.log(error);
          alert("Payment Verification Failed");

        }

      },

      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },

      theme: {
        color: "#f97316",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  } catch (error) {

    console.log(error);
    alert("Payment Failed");

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
                value={formData.fullName}
                onChange={handleChange}
                required
                className="border rounded-xl p-4 outline-none focus:border-orange-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border rounded-xl p-4 outline-none focus:border-orange-500"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]{10}"
                maxLength={10}
                required
                className="border rounded-xl p-4 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="border rounded-xl p-4 outline-none focus:border-orange-500"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                pattern="[0-9]{6}"
                maxLength={6}
                required
                className="border rounded-xl p-4 outline-none focus:border-orange-500"
              />

              <textarea
                rows="5"
                name="address"
                placeholder="Full Address"
                value={formData.address}
                onChange={handleChange}
                required
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
                UPI / Razorpay
              </label>

            </div>

            <button
              type="button"
              onClick={paymentHandler}
              className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold"
            >
              {formData.payment === "cod"
                ? "Place Order"
                : "Pay Now"}
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
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>₹{delivery}</span>
                </div>

                <div className="flex justify-between">
                  <span>GST</span>
                  <span>₹{gst}</span>
                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold">

                  <span>Total</span>

                  <span className="text-orange-500">
                    ₹{total}
                  </span>

                </div>

              </div>

              <div className="mt-8 bg-orange-50 rounded-2xl p-5">

                <h3 className="font-bold text-lg text-orange-600">
                  🔒 Secure Checkout
                </h3>

                <p className="mt-2 text-gray-600 text-sm leading-6">
                  Your payment information is encrypted and secure.
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