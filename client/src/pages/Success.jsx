import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function Success() {
  const orderId = "BN" + Math.floor(Math.random() * 1000000);

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-6 py-20">

      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl p-10 text-center">

        <div className="flex justify-center">
          <FaCheckCircle className="text-green-500 text-8xl animate-bounce" />
        </div>

        <h1 className="mt-8 text-5xl font-black text-gray-900">
          Order Placed!
        </h1>

        <p className="mt-5 text-gray-600 text-lg leading-8">
          Thank you for ordering with
          <span className="font-bold text-orange-500"> BiteNest</span>.
          Your order has been placed successfully and will be delivered shortly.
        </p>

        <div className="mt-10 bg-gray-50 rounded-2xl p-6">

          <h3 className="text-xl font-bold">
            Order ID
          </h3>

          <p className="text-orange-500 text-2xl font-black mt-2">
            #{orderId}
          </p>

        </div>

        <div className="grid sm:grid-cols-2 gap-5 mt-10">

          <Link
            to="/menu"
            className="bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition"
          >
            Continue Shopping
          </Link>

          <button
            className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white py-4 rounded-xl font-bold transition"
          >
            Track Order
          </button>

        </div>

        <div className="mt-10 text-gray-500">
          Estimated Delivery Time
          <h3 className="text-2xl font-bold text-gray-800 mt-2">
            25 - 35 Minutes
          </h3>
        </div>

      </div>

    </section>
  );
}

export default Success;