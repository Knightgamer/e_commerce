import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/admin/AdminDashboard1";
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
          <Route path="/home" element={<CustomerDashboard />} />
        )}
        {userRole === "administrator" && (
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        )}

        {/* Redirect or Default Route */}
        <Route
          path="*"
          element={
            <Navigate
              to={userRole === "administrator" ? "/admin/dashboard" : "/home"}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
