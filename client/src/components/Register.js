// components/Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = ({ onRegister }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    try {
      // Validate input (e.g., check if passwords match)
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      // Perform registration logic
      const response = await axios.post("http://localhost:5000/api/register", {
        firstName,
        surname,
        email,
        password,
      });

      console.log(response.data.message);

      // Assume that the server returns a user object upon successful registration
      // Update the onRegister callback with the actual logic
      onRegister(response.data.user);

      // Redirect to the home page after successful registration
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 max-w-md mx-auto my-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Surname:
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={handleRegister}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Register
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
