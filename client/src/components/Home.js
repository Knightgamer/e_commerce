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
    <div className="p-8 max-w-4xl mx-auto bg-purple-100 rounded-xl shadow-lg font-poppins">
      <h2 className="text-4xl font-extrabold text-purple-900 mb-8 text-center ">
        Welcome to E-buy by Nayana!
      </h2>

      {user ? (
        user.isAdmin ? (
          <div className="bg-pink-100 p-8 shadow-xl rounded-xl mb-10 transition-all duration-300 ease-in-out hover:shadow-2xl">
            <p className="text-2xl text-purple-800 mb-6">
              Welcome,{" "}
              <span className="font-bold underline decoration-purple-500">
                {user.firstName}
              </span>
              ! (Admin)
            </p>
            <div className="flex flex-col space-y-4">
              <Link
                to="/products-management"
                className="px-5 py-3 bg-purple-600 text-white text-lg rounded-full hover:bg-purple-800 transition-colors duration-300 ease-in-out text-center shadow-md hover:shadow-lg"
              >
                Go to Product Management
              </Link>
              <Link
                to="/sold-products"
                className="px-5 py-3 bg-purple-600 text-white text-lg rounded-full hover:bg-purple-800 transition-colors duration-300 ease-in-out text-center shadow-md hover:shadow-lg"
              >
                See sold products
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-3 bg-purple-600 text-white text-lg rounded-full hover:bg-purple-800 transition-colors duration-300 ease-in-out text-center shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-pink-100 p-8 shadow-xl rounded-xl mb-10 transition-all duration-300 ease-in-out hover:shadow-2xl">
            <p className="text-2xl text-purple-800 mb-6">
              Hello,{" "}
              <span className="font-bold underline decoration-purple-500">
                {user.firstName}
              </span>
              !
            </p>
            <div className="flex flex-col space-y-4">
              <Link
                to="/products"
                className="px-5 py-3 bg-purple-600 text-white text-lg rounded-full hover:bg-purple-800 transition-colors duration-300 ease-in-out text-center shadow-md hover:shadow-lg"
              >
                Products
              </Link>
              <button
                onClick={handleLogout}
                className="px-5 py-3 bg-purple-600 text-white text-lg rounded-full hover:bg-purple-800 transition-colors duration-300 ease-in-out text-center shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="bg-pink-100 p-8 shadow-xl rounded-xl mb-10 transition-all duration-300 ease-in-out hover:shadow-2xl">
          <p className="text-2xl text-purple-800 mb-6">
            Want to know what is trending at our site?
          </p>
          <p className="text-2xl text-purple-800 mb-6">
            Sign in to explore the products available at E-buy.
          </p>
          <Link
            to="/login"
            className="block px-5 py-3 bg-purple-600 text-white text-lg rounded-full hover:bg-purple-800 transition-colors duration-300 ease-in-out text-center shadow-md hover:shadow-lg"
          >
            Sign In
          </Link>
          <div className="mt-8">
            <h3 className="text-3xl font-bold text-purple-900 underline decoration-pink-500 mb-4">
              New here?
            </h3>
            <Link
              to="/register"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Register for exclusive deals!
            </Link>
          </div>
        </div>
      )}

      <div id="categories-section" className="mt-10">
        {/* Add category sections here */}
      </div>
    </div>
  );
};

export default Home;
