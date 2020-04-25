import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase";
import InventoryContext from "../../data/inventoryContext";

const CartSummary = () => {
  const { user, firebase } = useContext(FirebaseContext);
  const { cart } = useContext(InventoryContext);
  //console.log(cart.size());
  return (
    <div className="border-b border-yellow-500 mb-1 p-1 bg-yellow-100">
      <div className="text-lg text-yellow-700 font-bold">
        Welcome {user ? "back " + user.displayName : "Guest"}
      </div>
      <div className="text-yellow-800 text-md">
        {cart.length ? (
          <div>
            {cart.length} item{cart.length != 1 && "s"} in your cart.{" "}
            <button className="flex-shrink-0 border border-indigo-500 hover:bg-indigo-700  hover:text-white bg-white hover:border-blue-700 text-sm border-4 text-indigo-500 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed">
              Checkout Now
            </button>
          </div>
        ) : (
          "You do not have any items in your cart as yet. Browse or search below to start your shopping list!"
        )}
      </div>
    </div>
  );
};

export default CartSummary;
