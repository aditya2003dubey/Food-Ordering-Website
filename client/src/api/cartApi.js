import axios from "axios";

const API = "http://localhost:5000/api/cart";

export const addToCart = async (data) => {
  const res = await axios.post(`${API}/add`, data);
  return res.data;
};

export const getCart = async (userId) => {
  const res = await axios.get(`${API}/${userId}`);
  return res.data;
};

export const updateCart = async (id, quantity) => {
  const res = await axios.put(`${API}/${id}`, { quantity });
  return res.data;
};

export const removeCart = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};