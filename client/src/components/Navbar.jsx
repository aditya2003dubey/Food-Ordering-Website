import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiPackage,
} from "react-icons/fi";
import Container from "./Container";
import { useCart } from "../context/CartContext";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  const { cartItems } = useCart();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-orange-500 font-semibold"
      : "text-gray-700 hover:text-orange-500 transition";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <Container>
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-4xl font-black tracking-tight"
          >
            <span className="text-orange-500">Bite</span>
            <span className="text-gray-900">Nest</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-[16px] font-medium">

            <NavLink to="/" className={navLinkStyle}>
              Home
            </NavLink>

            <NavLink to="/menu" className={navLinkStyle}>
              Menu
            </NavLink>

            <NavLink to="/orders" className={navLinkStyle}>
              My Orders
            </NavLink>

            <NavLink to="/cart" className={navLinkStyle}>
              Cart
            </NavLink>

            {user ? (
              <div className="flex items-center gap-4">

                <Link
                  to="/profile"
                  className="font-semibold text-gray-700 hover:text-orange-500"
                >
                  👋 {user.name}
                </Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                  }}
                  className="px-5 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                >
                  Logout
                </button>

              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
              >
                Login
              </Link>
            )}

            <Link
              to="/cart"
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 hover:bg-orange-200 transition"
            >
              <FiShoppingCart size={22} />

              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                {totalItems}
              </span>
            </Link>

          </nav>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>

        </div>
      </Container>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <nav className="flex flex-col p-6 gap-5">

            <NavLink
              to="/"
              className={navLinkStyle}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/menu"
              className={navLinkStyle}
              onClick={() => setOpen(false)}
            >
              Menu
            </NavLink>

            <NavLink
              to="/orders"
              className={navLinkStyle}
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center gap-2">
                <FiPackage />
                <span>My Orders</span>
              </div>
            </NavLink>

            {user?.isAdmin && (
              <NavLink
                to="/admin"
                className="px-5 py-2 rounded-full bg-gray-900 text-white hover:bg-black transition"
              >
                Admin Panel
              </NavLink>
            )}

            <NavLink
              to="/cart"
              className={navLinkStyle}
              onClick={() => setOpen(false)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiShoppingCart />
                  <span>Cart</span>
                </div>

                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {totalItems}
                </span>
              </div>
            </NavLink>

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="font-semibold text-gray-700 hover:text-orange-500"
                >
                  👋 {user.name}
                </Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("user");
                    setOpen(false);
                    window.location.href = "/login";
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl text-center font-semibold transition"
              >
                Login
              </Link>
            )}

          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;