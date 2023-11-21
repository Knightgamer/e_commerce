import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("userRole"); // Clear the user role
    navigate("/"); // Navigate to the login page
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-between items-center">
        {userRole === "customer" && (
          <li>
            <Link
              to="/products"
              className="text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Products
            </Link>
          </li>
        )}
        {userRole === "administrator" && (
          <li>
            <Link
              to="/products-management"
              className="text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Products Management
            </Link>
          </li>
        )}
        <li>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
