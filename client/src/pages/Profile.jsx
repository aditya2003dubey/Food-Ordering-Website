import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="w-32 h-32 rounded-full bg-orange-500 text-white flex items-center justify-center text-5xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">

              <h2 className="text-3xl font-bold">
                {user?.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {user?.email}
              </p>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">

                <div className="bg-orange-50 rounded-2xl p-5 text-center">
                  <h3 className="text-3xl font-bold text-orange-500">
                    0
                  </h3>

                  <p>Total Orders</p>
                </div>

                <div className="bg-orange-50 rounded-2xl p-5 text-center">
                  <h3 className="text-3xl font-bold text-orange-500">
                    0
                  </h3>

                  <p>Wishlist</p>
                </div>

                <div className="bg-orange-50 rounded-2xl p-5 text-center">
                  <h3 className="text-3xl font-bold text-orange-500">
                    0
                  </h3>

                  <p>Cart Items</p>
                </div>

                <div className="bg-orange-50 rounded-2xl p-5 text-center">
                  <h3 className="text-3xl font-bold text-orange-500">
                    ⭐5
                  </h3>

                  <p>Rating</p>
                </div>

              </div>

              <div className="mt-10 flex gap-5 flex-wrap">

                <Link
                  to="/orders"
                  className="bg-orange-500 text-white px-6 py-3 rounded-xl"
                >
                  My Orders
                </Link>

                <button
                  onClick={logoutHandler}
                  className="bg-red-500 text-white px-6 py-3 rounded-xl"
                >
                  Logout
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;