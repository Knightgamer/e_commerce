import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    costPrice: "",
    stock: "",
    initialStock: "",
  });
  const [financialSummary, setFinancialSummary] = useState({
    totalSales: 0,
    totalCapital: 0,
    profit: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/items")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/items/financial-summary")
      .then((response) => setFinancialSummary(response.data))
      .catch((error) =>
        console.error("Error fetching financial summary:", error)
      );
  }, []);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      initialStock: newProduct.stock, // Add this line
    };
    axios
      .post("http://localhost:5000/items", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ name: "", price: "", costPrice: "", stock: "", initialStock: ""});
      })
      .catch((error) => console.error("Error adding product:", error));
  };
  const filteredProducts = products
    .filter((product) => !product.sold)
    .slice(0, 6);

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Form for adding new product */}
      <div className="md:w-1/3">
        <div className="bg-purple-100 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">
            Manage Products
          </h2>
          <form className="mb-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2">
                Name of Product:
                <input
                  type="text"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="shadow border border-purple-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2">
                Price:
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="shadow border border-purple-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2">
                Cost Price:
                <input
                  type="number"
                  name="costPrice"
                  value={newProduct.costPrice}
                  onChange={handleInputChange}
                  className="shadow border border-purple-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2">
                Stock:
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  className="shadow border border-purple-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </label>
            </div>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Product
            </button>
          </form>
          <div className="bg-pink-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold text-purple-800 mb-4">
              Financial Summary
            </h3>
            <p className="text-purple-700">
              Total Sales: Ksh. {financialSummary.totalSales}
            </p>
            <p className="text-purple-700">
              Total Capital: Ksh. {financialSummary.totalCapital}
            </p>
            <p className="text-purple-700">
              Profit: Ksh. {financialSummary.profit}
            </p>
          </div>
        </div>
      </div>

      {/* Products displayed in a flexbox layout */}
      <div className="md:w-2/3 grid grid-cols-1 gap-6">
        {filteredProducts.map((product, index) => (
          <div key={index} className="bg-pink-100 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-purple-800 mb-2">
              {product.name}
            </h3>
            <p className="text-purple-700">Price: Ksh.{product.price}</p>
            <p className="text-purple-700">Cost Price: Ksh.{product.costPrice}</p>
            <p className="text-purple-700">Stock Remaining: {product.stock}</p>
            <p className="text-purple-700">
              Status: {product.stock===0 ? "Sold" : "Available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsManagement;
