import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/payment",
});

export const createPaymentOrder = async (amount, token) => {
  const { data } = await API.post(
    "/create-order",
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const verifyPayment = async (data, token) => {
  const res = await API.post("/verify", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};