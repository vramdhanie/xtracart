import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase";

const CartSummary = () => {
  const { user, firebase } = useContext(FirebaseContext);
  return (
    <div className="border-b border-yellow-500 mb-1 p-1 bg-yellow-100">
      <div className="text-lg text-yellow-700 font-bold">
        Welcome {user ? "back " + user.displayName : "Guest"}
      </div>
      <div className="text-yellow-800 text-md">
        You do not have any items in your cart as yet. Browse or search below to
        start your shopping list!
      </div>
    </div>
  );
};

export default CartSummary;
