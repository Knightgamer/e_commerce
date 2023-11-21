import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Products from "./components/customer/Products";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductsManagement from "./components/admin/ProductsManagement";
import "./App.css";

const App = () => {
  // State to hold the current user's role
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  // Effect to update the role when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem("userRole"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes for logged-in users */}
        {userRole === "customer" && (
          <Route path="/products" element={<Products />} />
        )}
        {userRole === "administrator" && (
          <Route path="/products-management" element={<ProductsManagement />} />
        )}

        {/* Redirect or Default Route */}
        <Route
          path="*"
          element={
            <Navigate
              to={
                userRole === "administrator"
                  ? "/products-management"
                  : "/products"
              }
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
