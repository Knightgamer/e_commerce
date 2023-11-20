// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductsManagement from "./components/admin/ProductsManagement";
import OrdersManagement from "./components/OrdersManagement";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  const onLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const onLogout = () => {
    setUser(null);
  };

  const isAdmin = user && user.isAdmin;

  return (
    <Router>
      <div className="app">
        {/* Logo and Navbar */}
        <nav className="bg-white shadow">
          <ul className="flex items-center justify-center space-x-4 py-3">
            <li>
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-800 font-semibold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-600 hover:text-gray-800 font-semibold"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="text-gray-600 hover:text-gray-800 font-semibold"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/checkout"
                className="text-gray-600 hover:text-gray-800 font-semibold"
              >
                Checkout
              </Link>
            </li>

            {isAdmin && (
              <li>
                <Link
                  to="/products-management"
                  className="text-gray-600 hover:text-gray-800 font-semibold"
                >
                  Products Management
                </Link>
              </li>
            )}

            {isAdmin && (
              <li>
                <Link
                  to="/orders-management"
                  className="text-gray-600 hover:text-gray-800 font-semibold"
                >
                  Orders Management
                </Link>
              </li>
            )}

            {user ? (
              <li>
                <button
                  onClick={onLogout}
                  className="px-4 py-1 text-white bg-red-500 hover:bg-red-600 rounded-md font-semibold"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-800 font-semibold"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home user={user} onLogout={onLogout} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          {isAdmin && (
            <Route
              path="/products-management"
              element={<ProductsManagement />}
            />
          )}
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/register" element={<Register onRegister={onLogin} />} />
          {isAdmin && (
            <Route path="/orders-management" element={<OrdersManagement />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
