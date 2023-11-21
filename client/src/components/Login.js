import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Perform login logic
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      console.log(response.data.message);

      // Assume that the server returns a user object upon successful login
      // Update the onLogin callback with the actual logic
      onLogin(response.data.user);

      // Redirect to the home page after successful login
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-purple-100">
      <div className="p-6 max-w-sm w-full bg-pink-100 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-purple-800 mb-6">Login</h2>
        <form>
          <label className="block">
            <span className="text-purple-700">Email:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </label>
          <label className="block mt-4">
            <span className="text-purple-700">Password:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </label>
          <button
            type="button"
            onClick={handleLogin}
            className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );

};

export default Login;
