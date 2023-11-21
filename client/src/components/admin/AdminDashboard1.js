import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../Navigation"; // Import the Navigation component

const AdminDashboard1 = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    costPrice: "",
  });
  //FINANCIAL-SUMMARY
  const [financialSummary, setFinancialSummary] = useState({
    totalSales: 0,
    totalCapital: 0,
    profit: 0,
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/items") // Adjust the endpoint as needed
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  // Fetch products from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/items") // Adjust the endpoint as needed
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Fetch financial summary from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/items/financial-summary") // Adjust the endpoint as needed
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
    axios
      .post("http://localhost:5000/items", newProduct) // Adjust the endpoint as needed
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ name: "", price: "", costPrice: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Products Management
        </h2>

        {/* Form for adding new product */}
        <form
          className="bg-white p-4 shadow rounded-lg mb-8"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Name:
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price:
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          {/* Product Cost Price */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cost Price:
              <input
                type="number"
                name="costPrice"
                value={newProduct.costPrice}
                onChange={handleInputChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Product
          </button>
        </form>

        {/* Table to display products */}
        <div className="bg-white shadow rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cost Price
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {product.name}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      ${product.price}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      ${product.costPrice}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {product.sold ? "Sold" : "Available"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Financial Summary */}
            <tfoot>
              <tr>
                <td colSpan="2" className="font-bold text-right">
                  Total Sales:
                </td>
                <td>${financialSummary.totalSales}</td>
              </tr>
              <tr>
                <td colSpan="2" className="font-bold text-right">
                  Total Capital:
                </td>
                <td>${financialSummary.totalCapital}</td>
              </tr>
              <tr>
                <td colSpan="2" className="font-bold text-right">
                  Profit:
                </td>
                <td>${financialSummary.profit}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard1;
