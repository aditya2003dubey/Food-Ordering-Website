import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [foods, setFoods] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchFoods = async () => {
    const res = await axios.get("http://localhost:5000/api/foods");
    setFoods(res.data);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addFood = async () => {
    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("price", form.price);
      data.append("category", form.category);
      data.append("description", form.description);
      data.append("image", form.image);

      await axios.post(
        "http://localhost:5000/api/admin/food",
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Food Added");

      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
      });

      fetchFoods();

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const updateFood = async () => {
    try {
      const data = new FormData();

      data.append("name", form.name);
      data.append("price", form.price);
      data.append("category", form.category);
      data.append("description", form.description);

      if (form.image instanceof File) {
        data.append("image", form.image);
      }

      await axios.put(
        `http://localhost:5000/api/admin/food/${editingId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Food Updated");

      setEditingId(null);

      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
      });

      fetchFoods();

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const deleteFood = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/food/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Food Deleted");
      fetchFoods();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const editFood = (food) => {
    setEditingId(food._id);

    setForm({
      name: food.name,
      price: food.price,
      category: food.category,
      description: food.description,
      image: food.image,
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-12">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            {editingId ? "Update Food" : "Add Food"}
          </h2>

          <input
            name="name"
            placeholder="Food Name"
            value={form.name}
            onChange={handleChange}
            className="border w-full p-3 rounded mb-3"
          />

          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border w-full p-3 rounded mb-3"
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border w-full p-3 rounded mb-3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.files[0],
              })
            }
            className="border w-full p-3 rounded mb-3"
          />

          {form.image && (
            <img
              src={
                typeof form.image === "string"
                  ? form.image
                  : URL.createObjectURL(form.image)
              }
              alt="Preview"
              className="w-40 h-40 object-cover rounded-lg border mt-3"
            />
          )}

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border w-full p-3 rounded mb-3"
          />
          <button
            onClick={editingId ? updateFood : addFood}
            className="bg-orange-500 text-white w-full py-3 rounded-lg"
          >
            {editingId ? "Update Food" : "Add Food"}
          </button>

        </div>

        <div>

          <h2 className="text-2xl font-bold mb-5">
            Food List
          </h2>

          {foods.map((food) => (
            <div
              key={food._id}
              className="flex justify-between items-center border rounded-xl p-4 mb-3"
            >
              <div>
                <h3 className="font-bold">{food.name}</h3>
                <p>₹ {food.price}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => editFood(food)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteFood(food._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Admin;