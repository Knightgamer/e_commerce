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
        setProducts(response.data);
        if (response.data.length === 0) {
          setNoProductsMessage(true);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleStockChange = (event, productId) => {
    const newStock = parseInt(event.target.value, 10);
    setProducts(
      products.map((product) => {
        if (product._id === productId) {
          return { ...product, selectedStock: newStock };
        }
        return product;
      })
    );
  };

  const handlePayment = async (productId, selectedStock) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/items/${productId}/purchase`,
        {
          stock: selectedStock,
        }
      );

      // Update the state locally to reflect the new quantity
      setProducts(
        products.map((product) => {
          if (product._id === productId) {
            return {
              ...product,
              stock: product.stock - selectedStock,
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
    <div className="products p-6 max-w-4xl mx-auto bg-purple-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Products</h1>
      {/* Displaying products */}
      <div>
        {noProductsMessage ? (
          <p className="text-purple-700">
            There are no more products available at the moment, come back to
            check again.
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
              <p className="text-purple-600">Ksh. {product.price}</p>
              <p>Stock: {product.stock}</p>
              {product.stock > 0 && (
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      handleStockChange(
                        {
                          target: {
                            value: Math.max(
                              0,
                              (product.selectedStock || 0) - 1
                            ),
                          },
                        },
                        product._id
                      )
                    }
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-l focus:outline-none focus:shadow-outline"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={product.selectedStock || 0}
                    readOnly
                    className="px-3 py-1 bg-white border border-purple-300 text-center w-10"
                  />
                  <button
                    onClick={() =>
                      handleStockChange(
                        {
                          target: {
                            value: Math.min(
                              product.stock,
                              (product.selectedStock || 0) + 1
                            ),
                          },
                        },
                        product._id
                      )
                    }
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-r focus:outline-none focus:shadow-outline"
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      handlePayment(product._id, product.selectedStock)
                    }
                    className="mt-3 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 transition-colors duration-300"
                  >
                    Order and Pay
                  </button>
                </div>
              )}
              {product.stock === 0 && (
                <span className="text-red-500">Sold Out</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
