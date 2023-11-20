// App.js
import React, { useState } from "react";
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
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Conditional Routes */}
        {user && user.role === "customer" && (
          <Route path="/products" element={<Products />} />
        )}
        {user && user.role === "administrator" && (
          <Route path="/products-management" element={<ProductsManagement />} />
        )}
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
