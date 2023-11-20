import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Make sure to import useNavigate

const Products = () => {
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

  const handlePayment = async (productId) => {
    // Simulate payment logic
    try {
      // Here you would typically integrate with a payment gateway
      // For simplicity, we're just simulating a successful payment

      // After successful payment, mark the item as sold
      await axios.patch(`http://localhost:5000/items/${productId}/sold`);
      // Reload products to update the sold status
      // In a real-world scenario, you would optimally update the state locally
      navigate(0); // Refresh the page (or you can fetch the products again)
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
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
            {!product.sold && (
              <button
                onClick={() => handlePayment(product._id)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Pay and Buy
              </button>
            )}
            {product.sold && <span className="text-red-500">Sold Out</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
