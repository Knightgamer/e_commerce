// client/src/components/Products.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Implement navigation to the specified category
    navigate(`/#${category}`);
  };

  return (
    <div className="products p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Products</h1>
      <div className="category-dropdown mb-6">
        <span className="text-gray-700 font-medium mr-3">Categories:</span>
        <select
          onChange={(e) => handleCategoryClick(e.target.value)}
          className="border border-gray-300 rounded py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="dairy">Dairy</option>
          <option value="pantry">Pantry</option>
          <option value="meat">Meat</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          {/* Add more categories as needed */}
        </select>
      </div>

      <div className="product-category" id="dairy">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Dairy Products
        </h2>
        {/* Add dairy products here */}
      </div>
      <div className="product-category" id="pantry">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Pantry Products
        </h2>
        {/* Add pantry products here */}
      </div>
      <div className="product-category" id="meat">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Meat Products
        </h2>
        {/* Add meat products here */}
      </div>
      <div className="product-category" id="fruits">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Fruits</h2>
        {/* Add fruit products here */}
      </div>
      <div className="product-category" id="vegetables">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Vegetables</h2>
        {/* Add vegetable products here */}
      </div>
    </div>
  );
};

export default Products;
