import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
    const [orders, setOrders] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchOrders = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/admin/orders",
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            setOrders(res.data.orders);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(
                `http://localhost:5000/api/admin/orders/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            fetchOrders();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-10 px-5">

            <h1 className="text-4xl font-bold mb-8">
                Admin Orders
            </h1>

            <div className="overflow-x-auto">

                <table className="w-full border">

                    <thead className="bg-orange-500 text-white">

                        <tr>
                            <th className="p-3">Customer</th>
                            <th className="p-3">Items</th>
                            <th className="p-3">Total</th>
                            <th className="p-3">Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr
                                key={order._id}
                                className="border-b text-center"
                            >

                                <td className="p-3">
                                    {order.user?.name}
                                </td>

                                <td className="p-3">
                                    {order.items.length}
                                </td>

                                <td className="p-3">
                                    ₹{order.totalAmount}
                                </td>

                                <td className="p-3">
                                    <select
                                        value={order.status}
                                        onChange={(e) =>
                                            updateStatus(order._id, e.target.value)
                                        }
                                        className="border rounded px-3 py-2"
                                    >
                                        <option>Pending</option>
                                        <option>Preparing</option>
                                        <option>Out for Delivery</option>
                                        <option>Delivered</option>
                                    </select>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default AdminOrders;