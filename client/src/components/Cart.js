// client/src/components/Cart.js
import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem !== item);
    setCartItems(updatedCart);
  };

  return (
    <div className="cart bg-white p-6 shadow rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h1>
      <ul className="divide-y divide-gray-200">
        {cartItems.map((item, index) => (
          <li key={index} className="py-4 flex justify-between items-center">
            <span className="text-gray-600">
              {item.name} - <span className="font-semibold">${item.price}</span>
            </span>
            <button
              onClick={() => removeFromCart(item)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
