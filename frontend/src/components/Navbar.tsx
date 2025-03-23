import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/auth";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const { isDarkMode } = useTheme();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      // Show a toast or notification
    }
  };

  return (
    <nav className="w-full px-4 py-3 shadow-sm fixed top-0 z-50 transition-colors duration-300 dark:bg-black bg-white dark:text-white text-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" aria-label="Home">
          <motion.i
            className={`fa-solid fa-dragon text-3xl ${
              isDarkMode ? "text-amber-400" : "text-amber-600"
            }`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          />
          <span className="font-bold text-xl hidden sm:block">K-Shop</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-amber-500 transition-colors duration-200 flex items-center"
              aria-label="Home"
            >
              <i className="fa-solid fa-house text-lg"></i>
              <span className="ml-2 hidden md:block">Home</span>
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              className="hover:text-amber-500 transition-colors duration-200 flex items-center"
              aria-label="Cart"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              <span className="ml-2 hidden md:block">Cart</span>
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/account"
                  className="hover:text-amber-500 transition-colors duration-200 flex items-center"
                  aria-label="Account"
                >
                  <i className="fa-solid fa-user text-lg"></i>
                  <span className="ml-2 hidden md:block">Account</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-medium  bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg font-medium text-white bg-amber-600 hover:bg-amber-700 transition-colors duration-200"
              >
                Login
              </Link>
            </li>
          )}

          {/* Dark Mode Toggle */}
          <li>
            <DarkModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
