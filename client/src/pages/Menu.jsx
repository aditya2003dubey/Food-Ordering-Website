import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import API from "../api/axios";
import { addToCart } from "../api/cartApi";
import toast from "react-hot-toast";
import {useCart} from "../context/CartContext"

const Menu = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const {fetchCart} = useCart();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = [
    "All",
    "Burger",
    "Pizza",
    "Noodles",
    "Snacks",
    "Drinks",
    "Dessert",
  ];

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

  const filteredFoods = foods
    .filter((food) => {
      const matchCategory =
        category === "All" || food.category === category;

      const matchSearch = food.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

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

      await fetchCart();
      
      toast.success("Added To Cart");
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  if (loading) {
    return (
      <h2 className="text-center py-20 text-3xl">
        Loading...
      </h2>
    );
  }

  return (
    <>
      {/* Hero */}
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

        {/* Search */}
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

        {/* Sort */}
        <div className="flex justify-end mt-6">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="default">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                category === cat
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 hover:bg-orange-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 duration-300"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  <div className="flex justify-between items-center">

                    <h2 className="font-bold text-xl">
                      {food.name}
                    </h2>

                    <span className="font-bold text-orange-500">
                      ₹{food.price}
                    </span>

                  </div>

                  <p className="text-gray-500 mt-2">
                    {food.category}
                  </p>

                  <p className="mt-2 text-yellow-500">
                    ⭐ {food.rating || 4.5}
                  </p>

                  <button
                    onClick={() => addCartHandler(food._id)}
                    className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
                  >
                    Add To Cart
                  </button>

                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-2xl text-gray-500 py-20">
              No Food Found 😔
            </div>
          )}

        </div>

      </div>
    </>
  );
};

export default Menu;