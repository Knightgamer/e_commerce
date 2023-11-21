// components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      const userRole = response.data.user.role;
      localStorage.setItem("userRole", userRole); // Save role to localStorage
      console.log("Login Response:", response.data); // Log the response data to inspect it
      const { accessToken, user } = response.data;

      console.log("User role from server:", user.role);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", user.role);
      // Navigate based on user role
      if (userRole === "customer") {
        navigate("/products");
      } else if (userRole === "administrator") {
        navigate("/products-management");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <label className="block">
            <span className="text-gray-700">Email:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <label className="block mt-4">
            <span className="text-gray-700">Password:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <button
            type="button" // remains 'button' type
            onClick={handleLogin} // attach the function here
            className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
