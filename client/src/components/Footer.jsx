import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-black">
              <span className="text-orange-500">Bite</span>
              <span className="text-white">Nest</span>
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Delicious food delivered to your doorstep.
              Fast, fresh and secure food ordering experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-bold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link to="/" className="hover:text-orange-500">Home</Link>
              <Link to="/menu" className="hover:text-orange-500">Menu</Link>
              <Link to="/cart" className="hover:text-orange-500">Cart</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-xl font-bold mb-5">
              Support
            </h3>

            <div className="flex flex-col gap-3">
              <p>Help Center</p>
              <p>Privacy Policy</p>
              <p>Terms & Conditions</p>
              <p>Contact Us</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white text-xl font-bold mb-5">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center duration-300"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center duration-300"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center duration-300"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800 hover:bg-orange-500 flex items-center justify-center duration-300"
              >
                <FaGithub />
              </a>

            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500">
          © 2026 BiteNest. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;