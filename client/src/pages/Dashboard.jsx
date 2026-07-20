import { useEffect, useState } from "react";
import axios from "axios";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function Dashboard() {
    const [stats, setStats] = useState({});

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/admin/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                );

                setStats(data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchDashboard();
    }, []);

    const chartData = {
        labels: ["Users", "Foods", "Orders", "Revenue"],
        datasets: [
            {
                label: "Dashboard Analytics",
                data: [
                    stats.totalUsers || 0,
                    stats.totalFoods || 0,
                    stats.totalOrders || 0,
                    stats.totalRevenue || 0,
                ],
            },
        ],
    };
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-10">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-gray-500">Total Users</h3>
                    <h2 className="text-4xl font-bold text-blue-600 mt-3">
                        {stats.totalUsers || 0}
                    </h2>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-gray-500">Total Foods</h3>
                    <h2 className="text-4xl font-bold text-orange-500 mt-3">
                        {stats.totalFoods || 0}
                    </h2>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-gray-500">Total Orders</h3>
                    <h2 className="text-4xl font-bold text-green-600 mt-3">
                        {stats.totalOrders || 0}
                    </h2>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-gray-500">Total Revenue</h3>
                    <h2 className="text-4xl font-bold text-red-500 mt-3">
                        ₹{stats.totalRevenue || 0}
                    </h2>
                </div>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

                <h2 className="text-2xl font-bold mb-5">
                    Analytics Overview
                </h2>

                <Bar data={chartData} />

            </div>

        </div>
    );
}

export default Dashboard;