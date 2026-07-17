import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-orange-100">

        <div className=" max-w-7xl mx-auto px-5 lg:px-8 min-h-[90vh] grid lg:grid-cols-2 items-center gap-12">

          {/* Left */}

          <div>

            <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-medium">
              🍔 Fresh • Fast • Delicious
            </span>

            <h1 className="mt-6 text-5xl lg:text-7xl font-black leading-tight text-gray-900">

              Discover
              <span className="text-orange-500"> Amazing</span>

              <br />

              Food Near You

            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">

              BiteNest brings your favourite restaurants together in one
              place. Fresh meals, quick delivery and unforgettable taste.

            </p>

            {/* Search */}

            <div className="mt-10 bg-white shadow-xl rounded-full flex overflow-hidden">

              <input
                type="text"
                placeholder="Search food, restaurants..."
                className="flex-1 px-6 py-4 outline-none"
              />

              <button className="bg-orange-500 px-8 text-white hover:bg-orange-600 transition">

                <FiSearch size={22} />

              </button>

            </div>

            {/* Buttons */}

            <div className="flex gap-5 mt-8">

              <Link
                to="/menu"
                className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-xl font-semibold transition"
              >
                Explore Menu
              </Link>

              <button className="border-2 border-orange-500 text-orange-500 px-7 py-3 rounded-xl hover:bg-orange-500 hover:text-white transition">

                Learn More

              </button>

            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center">

            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900"
              alt="Pizza"
              className="w-full max-w-xl drop-shadow-2xl rounded-3xl"
            />

          </div>

        </div>

      </section>

      {/* Categories */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="flex justify-between items-center mb-10">

            <h2 className="text-4xl font-bold text-gray-800">
              Explore Categories
            </h2>

            <Link
              to="/menu"
              className="text-orange-500 font-semibold hover:underline"
            >
              View All
            </Link>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">

            {[
              { emoji: "🍕", name: "Pizza" },
              { emoji: "🍔", name: "Burger" },
              { emoji: "🍟", name: "Snacks" },
              { emoji: "🥤", name: "Drinks" },
              { emoji: "🍜", name: "Noodles" },
              { emoji: "🍰", name: "Dessert" },
            ].map((item, index) => (

              <div
                key={index}
                className="bg-orange-50 hover:bg-orange-500 hover:text-white rounded-3xl p-6 text-center cursor-pointer transition duration-300 shadow-md hover:shadow-xl"
              >

                <div className="text-5xl">{item.emoji}</div>

                <h3 className="mt-4 font-semibold text-lg">
                  {item.name}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Featured Foods */}

      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <h2 className="text-4xl font-bold mb-12 text-center">
            Popular Dishes
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 duration-300"
              >

                <img
                  src={`https://picsum.photos/400/300?random=${item}`}
                  alt=""
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  <div className="flex justify-between">

                    <h3 className="text-xl font-bold">
                      Chicken Burger
                    </h3>

                    <span className="text-orange-500 font-bold">
                      ₹249
                    </span>

                  </div>

                  <p className="text-gray-500 mt-3">

                    Crispy chicken burger with cheese and fresh vegetables.

                  </p>

                  <div className="flex justify-between items-center mt-5">

                    <span className="text-yellow-500">
                      ⭐ 4.8
                    </span>

                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl">

                      Add To Cart

                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>
      {/* Special Offer */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 rounded-3xl p-10 lg:p-16 text-white flex flex-col lg:flex-row items-center justify-between gap-10">

            <div>

              <span className="bg-white text-orange-500 px-4 py-2 rounded-full font-semibold">
                🔥 Limited Time Offer
              </span>

              <h2 className="text-4xl lg:text-5xl font-extrabold mt-6 leading-tight">

                Get Flat 50% OFF

                <br />

                On Your First Order

              </h2>

              <p className="mt-5 text-lg text-orange-100 max-w-xl">

                Discover your favourite meals with exclusive discounts.
                Freshly prepared food delivered straight to your doorstep.

              </p>

              <button className="mt-8 bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:scale-105 transition duration-300">

                Order Now

              </button>

            </div>

            <div className="flex justify-center">

              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700"
                alt="Special Offer"
                className="w-full max-w-md rounded-3xl shadow-2xl"
              />

            </div>

          </div>

        </div>

      </section>
      {/* Why Choose Us */}

      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="text-center mb-14">

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
              Why Choose BiteNest?
            </h2>

            <p className="mt-4 text-gray-600 text-lg">
              We deliver happiness with every meal. Fresh ingredients, quick delivery
              and an unforgettable experience.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Card 1 */}

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300">

              <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-5xl">
                🚚
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Fast Delivery
              </h3>

              <p className="mt-4 text-gray-600">
                Hot and fresh food delivered in less than 30 minutes.
              </p>

            </div>

            {/* Card 2 */}

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300">

              <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-5xl">
                🍽️
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Fresh Meals
              </h3>

              <p className="mt-4 text-gray-600">
                Prepared using high-quality ingredients by expert chefs.
              </p>

            </div>

            {/* Card 3 */}

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300">

              <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-5xl">
                ⭐
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Top Rated
              </h3>

              <p className="mt-4 text-gray-600">
                Thousands of happy customers trust BiteNest every day.
              </p>

            </div>

            {/* Card 4 */}

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 transition duration-300">

              <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-5xl">
                💳
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Secure Payment
              </h3>

              <p className="mt-4 text-gray-600">
                Safe and secure payment methods with instant confirmation.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Customer Reviews */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="text-center mb-14">

            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800">
              What Our Customers Say
            </h2>

            <p className="mt-4 text-lg text-gray-500">
              Thousands of happy food lovers trust BiteNest every day.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-orange-50 rounded-3xl p-8 shadow-lg">

              <div className="text-5xl">😊</div>

              <p className="mt-5 text-gray-600 leading-7">
                Amazing food quality and super fast delivery. The user interface is
                simple and ordering takes only a few clicks.
              </p>

              <h3 className="mt-6 font-bold text-xl">
                Rahul Sharma
              </h3>

              <span className="text-yellow-500">★★★★★</span>

            </div>

            <div className="bg-orange-50 rounded-3xl p-8 shadow-lg">

              <div className="text-5xl">😍</div>

              <p className="mt-5 text-gray-600 leading-7">
                Loved the experience. Food arrived hot and fresh exactly on time.
                Highly recommended.
              </p>

              <h3 className="mt-6 font-bold text-xl">
                Priya Singh
              </h3>

              <span className="text-yellow-500">★★★★★</span>

            </div>

            <div className="bg-orange-50 rounded-3xl p-8 shadow-lg">

              <div className="text-5xl">🤩</div>

              <p className="mt-5 text-gray-600 leading-7">
                One of the best food ordering experiences. Smooth interface and
                secure payment.
              </p>

              <h3 className="mt-6 font-bold text-xl">
                Aman Verma
              </h3>

              <span className="text-yellow-500">★★★★★</span>

            </div>

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">

        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">

            <div>
              <h2 className="text-5xl font-bold">500+</h2>
              <p className="mt-3 text-orange-100">
                Restaurants
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">20K+</h2>
              <p className="mt-3 text-orange-100">
                Happy Customers
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">10K+</h2>
              <p className="mt-3 text-orange-100">
                Orders Delivered
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">4.9★</h2>
              <p className="mt-3 text-orange-100">
                Customer Rating
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Call To Action */}

      <section className="py-24 bg-gray-100">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 rounded-[35px] p-10 lg:p-16 text-center shadow-2xl">

            <h2 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">

              Ready To Order Your
              <br />
              Favourite Meal?

            </h2>

            <p className="mt-6 text-lg text-orange-100 max-w-2xl mx-auto leading-8">

              Explore hundreds of delicious dishes from trusted restaurants.
              Fresh food, quick delivery and secure payment — all in one place.

            </p>

            <div className="mt-10 flex flex-wrap  justify-center items-center gap-6">

              <Link
                to="/menu"
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:scale-105 duration-300"
              >
                Browse Menu
              </Link>

              <Link
                to="/cart"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-600 duration-300"
              >
                View Cart
              </Link>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}

export default Home;