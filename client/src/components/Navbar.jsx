import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-orange-500 font-semibold"
      : "text-gray-700 hover:text-orange-500 transition";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-4xl font-black tracking-tight"
        >
          <span className="text-orange-500">Bite</span>
          <span className="text-gray-900">Nest</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10 text-[16px] font-medium">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/menu" className={navLinkStyle}>
            Menu
          </NavLink>

          <NavLink to="/cart" className={navLinkStyle}>
            Cart
          </NavLink>

          <button
            className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg"
          >
            Login
          </button>

          <Link
            to="/cart"
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 hover:bg-orange-200 transition"
          >

            <FiShoppingCart
              size={22}
            />

            <span
              className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
            >
              0
            </span>

          </Link>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-5 gap-5">
            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/menu" onClick={() => setOpen(false)}>
              Menu
            </NavLink>

            <NavLink to="/cart" onClick={() => setOpen(false)}>
              Cart
            </NavLink>

            <button className="bg-orange-500 text-white py-2 rounded-lg">
              Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;