// import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { addToCart } from "../api/cartApi";
import toast from "react-hot-toast"


const Menu = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Burger", "Pizza", "Noodles", "Snacks"];

  const filteredFoods = foods.filter((food) => {
    const matchCategory =
      category === "All" || food.category === category;

    const matchSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await API.get("/foods");

        setFoods(data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return (
      <h2 className="text-center py-20 text-3xl">
        Loading...
      </h2>
    );
  }

  const addCartHandler = async (foodId) => {

    if (!user) {
      toast.error("Please Login First");
      return;
    }

    try {

      await addToCart({
        userId: user._id,
        productId: foodId,
        quantity: 1,
      });

      toast.success("Added To Cart");

    } catch (error) {

      toast.error("Something Went Wrong");

    }

  };

  return (
    <>
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-black">
            Explore Our Menu
          </h1>

          <p className="mt-4 text-orange-100">
            Fresh • Delicious • Affordable
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="bg-white rounded-full shadow-lg flex overflow-hidden">

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-6 py-4 outline-none"
          />

          <button className="bg-orange-500 px-8 text-white">
            <FiSearch size={22} />
          </button>

        </div>

        <div className="flex flex-wrap gap-4 mt-10">

          {categories.map((cat) => (

            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition ${category === cat
                ? "bg-orange-500 text-white"
                : "bg-gray-100 hover:bg-orange-100"
                }`}
            >

              {cat}

            </button>

          ))}

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {foods.map((food) => (

            <div
              key={food.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 duration-300"
            >

              <img
                src={food.image}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">

                <div className="flex justify-between">

                  <h2 className="font-bold text-xl">
                    {food.name}
                  </h2>

                  <span className="font-bold text-orange-500">
                    ₹{food.price}
                  </span>

                </div>

                <p className="mt-3 text-yellow-500">
                  ⭐ {food.rating}
                </p>

                <button
                  onClick={() => addCartHandler(food._id)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl"
                >
                  Add To Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
};

export default Menu;