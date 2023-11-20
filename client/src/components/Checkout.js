// client/src/components/Checkout.js
import React, { useState } from "react";

const Checkout = ({ cartItems }) => {
  const [shippingAddress, setShippingAddress] = useState("");

  const handleCheckout = () => {
    // Implement checkout logic (e.g., send order to server)
    console.log("Checkout:", { cartItems, shippingAddress });
  };

  return (
    <div className="checkout bg-white p-8 shadow-md rounded-lg max-w-md mx-auto my-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Shipping Address:
        </label>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Complete Purchase
      </button>
    </div>
  );
};

export default Checkout;
