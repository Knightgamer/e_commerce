import React, { useState, useEffect } from "react";
import axios from "axios";

const SoldProducts = () => {
  const [soldProducts, setSoldProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/items")
      .then((response) => {
        const soldItems = response.data.filter((product) => product.stock == 0);
        setSoldProducts(soldItems);
      })
      .catch((error) => console.error("Error fetching sold products:", error));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-purple-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Sold Products</h1>

      {/* Displaying sold products */}
      <div className="grid grid-cols-1 gap-6">
        {soldProducts.length > 0 ? (
          soldProducts.map((product, index) => (
            <div key={index} className="bg-pink-100 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-purple-800 mb-2">
                {product.name}
              </h3>
              <p className="text-purple-700">Price: Ksh. {product.price}</p>
              <p className="text-purple-700">
                Cost Price: Ksh. {product.costPrice}
              </p>
              <p className="text-red-500">Sold</p>
            </div>
          ))
        ) : (
          <p className="text-purple-700">No products have been sold yet.</p>
        )}
      </div>
    </div>
  );
};

export default SoldProducts;
