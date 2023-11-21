import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [noProductsMessage, setNoProductsMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the backend
    axios
      .get("http://localhost:5000/items")
      .then((response) => {
        // Filter out sold products and limit the display to a maximum of 5 products
        const filteredProducts = response.data
          .filter((product) => !product.sold)
          .slice(0, 5);
        setProducts(filteredProducts);
        if (filteredProducts.length === 0) {
          setNoProductsMessage(true);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handlePayment = async (productId) => {
    try {
      // Simulate a successful payment
      await axios.patch(`http://localhost:5000/items/${productId}/sold`);
      // After successful payment, refresh the product list
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts);
      if (updatedProducts.length === 0) {
        // If no more products available, show a message
        setNoProductsMessage(true);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <div className="products p-6 max-w-4xl mx-auto bg-purple-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Products</h1>

      {/* Displaying products */}
      <div>
        {noProductsMessage ? (
          <p className="text-purple-700">
            There are no more products available for sale.
          </p>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-purple-200 rounded-lg bg-pink-100"
            >
              <h2 className="text-xl font-semibold text-purple-700">
                {product.name}
              </h2>
              <p className="text-purple-600">$ {product.price}</p>
              {!product.sold && (
                <button
                  onClick={() => handlePayment(product._id)}
                  className="mt-3 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 transition-colors duration-300"
                >
                  Pay and Buy
                </button>
              )}
              {product.sold && <span className="text-red-500">Sold Out</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
