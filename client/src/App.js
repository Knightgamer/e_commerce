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
import Login from "./components/Login";
import Register from "./components/Register";
import ProductsManagement from "./components/admin/ProductsManagement"; // Import ProductsManagement component
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  const onLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const onLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="app">
        {/* Logo and Navbar */}
        <nav className="bg-green-500 shadow">
          <ul className="flex items-center justify-center space-x-4 py-3">
            <li>
              <Link to="/" className="text-white font-semibold hover:text-gray-200">
                Home
              </Link>
            </li>
            {/* Conditionally render Products link */}
            {user && (
              <li>
                <Link to="/products" className="text-white font-semibold hover:text-gray-200">
                  Products
                </Link>
              </li>
            )}
            {/* Render Products Management link only for admin users */}
            {user && user.isAdmin && (
              <li>
                <Link to="/products-management" className="text-white font-semibold hover:text-gray-200">
                  Products Management
                </Link>
              </li>
            )}
            {/* Render Logout or Login link based on user authentication */}
            {user ? (
              <li>
                <button onClick={onLogout} className="button button-primary">
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="login-btn">
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
          <Route path="/products-management" element={<ProductsManagement />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/register" element={<Register onRegister={onLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
