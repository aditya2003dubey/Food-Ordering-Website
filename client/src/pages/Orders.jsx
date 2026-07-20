import { useEffect, useState } from "react";
import { getOrders } from "../api/orderApi";

function Orders() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders(user._id, user.token);
      setOrders(data.orders);
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
            My Orders
          </h1>

          <p className="mt-4 text-orange-100 text-lg">
            Track all your food orders.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6">

          {orders.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
              <h2 className="text-3xl font-bold">
                No Orders Found
              </h2>

              <p className="text-gray-500 mt-3">
                You haven't placed any orders yet.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-3xl shadow-lg p-8"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                    <div>
                      <h2 className="text-xl font-bold">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h2>

                      <p className="text-gray-500 mt-2">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-orange-500 text-xl">
                        ₹{order.totalAmount}
                      </p>

                      <p className="mt-2">
                        {order.paymentMethod}
                      </p>

                      <span className="inline-block mt-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  <hr className="my-6" />

                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item._id}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <h3 className="font-semibold">
                            {item.product?.name}
                          </h3>

                          <p className="text-gray-500">
                            Qty : {item.quantity}
                          </p>
                        </div>

                        <p className="font-bold">
                          ₹{item.product?.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}

export default Orders;