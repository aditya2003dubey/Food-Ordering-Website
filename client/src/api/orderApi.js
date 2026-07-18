import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/orders",
});

export const placeOrder = async (orderData, token) => {
  const res = await API.post("/", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getOrders = async (userId, token) => {
  const res = await API.get(`/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};