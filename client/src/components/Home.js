import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ user, onLogout }) => {
  const [showCategories, setShowCategories] = useState(false);

  const handleLogout = () => {
    onLogout();
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);

    // Scroll to the section where the categories are displayed
    const categoriesSection = document.getElementById("categories-section");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-green-200 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Welcome to our E-Commerce Site
      </h2>

      {user ? (
        user.isAdmin ? (
          <div className="bg-white p-4 shadow rounded-lg mb-6">
            <p className="text-lg text-gray-700">
              Welcome, <span className="font-semibold">{user.firstName}</span>! (Admin)
            </p>
            <Link
              to="/products-management"
              className="block mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300"
            >
              Go to Product Management
            </Link>
            <button
              onClick={handleLogout}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="bg-white p-4 shadow rounded-lg mb-6">
            <p className="text-lg text-gray-700">
              Hello, <span className="font-semibold">{user.firstName}</span>!
            </p>
            <Link
              to="/products"
              className="block mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300"
            >
              Products
            </Link>
            <button
              onClick={handleLogout}
              className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        )
      ) : (
        <div className="bg-white p-4 shadow rounded-lg mb-6">
          <p className="text-lg text-gray-700">You are not logged in.</p>
          <p className="text-lg text-gray-700">
            Sign in to explore our products and services.
          </p>
          <Link
            to="/login"
            className="block mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors duration-300"
          >
            Sign In
          </Link>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Special Offers for New Customers
            </h3>
            <p className="text-lg text-gray-700">
              Register now to unlock exclusive deals!
            </p>
          </div>
        </div>
      )}

      <div id="categories-section" className="mt-6">
        {/* Add category sections here */}
      </div>
    </div>
  );
};

export default Home;
