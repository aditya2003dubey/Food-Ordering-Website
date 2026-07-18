import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email: formData.email,
        password: formData.password,
      }
    );

    localStorage.setItem("user", JSON.stringify(data));

    alert("Login Successful");

    navigate("/");

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Invalid Email or Password"
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-5 py-12">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-orange-500">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to continue ordering your favourite food.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:border-orange-500"
            />

          </div>

          <div>

            <label className="font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border rounded-xl outline-none focus:border-orange-500"
            />

          </div>

          <div className="flex justify-between items-center text-sm">

            <label className="flex items-center gap-2">

              <input type="checkbox" />

              Remember Me

            </label>

            <Link
              to="/forgot-password"
              className="text-orange-500 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            Login
          </button>

        </form>

        <div className="mt-8 text-center">

          <p className="text-gray-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-orange-500 font-semibold hover:underline"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;