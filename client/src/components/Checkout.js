import React, { useState } from "react";

const Checkout = ({ cartItems }) => {
  const [shippingAddress, setShippingAddress] = useState("");

  const handleCheckout = () => {
    // Implement checkout logic (e.g., send order to server)
    console.log("Checkout:", { cartItems, shippingAddress });
  };

  return (
    <div className="checkout bg-green-200 p-6 shadow rounded-lg max-w-md mx-auto my-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
      <div className="mb-4 w-full">
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
        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Complete Purchase
      </button>
    </div>
  );
};

export default Checkout;
