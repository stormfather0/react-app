import React, { useState } from "react";
import { useCart } from "../CartContext";
import { Minus, Plus, Trash } from "lucide-react";

export default function Checkout() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ul className="space-y-6 overflow-y-auto">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <img
                    src={item.thumbnail || item.image || item.images?.[0]}
                    alt={item.title}
                    className="w-24 h-24 object-contain rounded-md bg-gray-100"
                  />

                  <div className="flex flex-col flex-grow">
                    <p className="font-semibold text-lg">{item.title}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="px-2 py-1 border rounded hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border rounded hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove Button or Confirmation */}
                    {confirmDeleteId === item.id ? (
                      <div className="mt-2 bg-red-50 border border-red-200 rounded p-1 shadow-sm space-y-1">
                        <p className="text-sm text-red-700">Remove this item from your cart?</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              removeFromCart(item.id);
                              setConfirmDeleteId(null);
                            }}
                            className="px-1 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Yes, remove
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
<button
  onClick={() => setConfirmDeleteId(item.id)}
  className="w-fit mt-2 inline-flex items-center gap-1 text-xs text-red-500 hover:text-white hover:bg-red-500 border border-red-500 px-1.5 py-1 rounded transition-all"
>
  <Trash size={14} />
  Remove
</button>
                    )}
                  </div>

                  <p className="font-bold text-lg whitespace-nowrap">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right text-2xl font-bold">
              Total: ${total.toFixed(2)}
            </div>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-4 rounded-lg transition">
          Confirm Order
        </button>
      )}
    </div>
  );
}