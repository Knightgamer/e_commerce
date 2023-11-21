import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Make sure to import useNavigate
import Navigation from "../Navigation"; // Import the Navigation component

const CustomerDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the backend
    axios
      .get("http://localhost:5000/items") // Adjust this endpoint as per your API
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  const handleQuantityChange = (event, productId) => {
    const newQuantity = parseInt(event.target.value, 10);
    setProducts(
      products.map((product) => {
        if (product._id === productId) {
          return { ...product, selectedQuantity: newQuantity };
        }
        return product;
      })
    );
  };

  const handlePayment = async (productId, selectedQuantity) => {
    try {
      // Simulate payment logic
      // ...

      const response = await axios.patch(
        `http://localhost:5000/items/${productId}/buy`,
        {
          quantity: selectedQuantity,
        }
      );

      // Update the state locally to reflect the new quantity
      setProducts(
        products.map((product) => {
          if (product._id === productId) {
            return {
              ...product,
              quantity: product.quantity - selectedQuantity,
            };
          }
          return product;
        })
      );
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="products p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>

        {/* Displaying products */}
        <div>
          {products.map((product, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-200 rounded-lg"
            >
              <h2 className="text-xl font-semibold text-gray-700">
                {product.name}
              </h2>
              <p className="text-gray-600">$ {product.price}</p>
              <p className="text-gray-600">
                Available Quantity: {product.quantity}
              </p>

              {product.quantity > 0 && (
                <div>
                  <input
                    type="number"
                    min="0"
                    max={product.quantity}
                    value={product.selectedQuantity || 0}
                    onChange={(e) => handleQuantityChange(e, product._id)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                  />
                  <button
                    onClick={() =>
                      handlePayment(product._id, product.selectedQuantity)
                    }
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Pay and Buy
                  </button>
                </div>
              )}

              {product.quantity === 0 && (
                <span className="text-red-500">Sold Out</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
