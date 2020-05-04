import React, { useContext } from "react";
import { FirebaseContext } from "../../firebase";
import InventoryContext from "../../data/inventoryContext";
import { Link } from "react-router-dom";
import { MdCheck } from "react-icons/md";

const CartSummary = () => {
  const { user } = useContext(FirebaseContext);
  const { cart, cartTotal } = useContext(InventoryContext);
  const lastItem = cart.length ? cart[cart.length - 1] : null;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="border-b border-yellow-500 mb-1 bg-yellow-100 ">
      {cart.length ? (
        <div className="text-yellow-800 text-md flex flex-col md:flex-row">
          <div className="flex border-yellow-500 border-b md:border-b-0">
            {lastItem && (
              <div className="flex px-2 items-center border-r border-yellow-500">
                <div className="px-2 font-size-xl text-green-500 font-bold">
                  <MdCheck />
                </div>
                <div className="p-1 w-10 h-10">
                  <img
                    src={lastItem.image}
                    alt={lastItem.description}
                    title={lastItem.description}
                    className="w-full h-full object-contain border border-purple-800"
                  />
                </div>
                <div className="px-1 font-size-sm"> added to cart</div>
              </div>
            )}
            <div className="flex justify-center items-center px-2 flex-col md:flex-row flex-1">
              <span>
                Cart subtotal ({cart.length} item{cart.length !== 1 && "s"}):
                {""}
              </span>

              <span className="text-base md:text-lg text-red-400 font-bold">
                {formatter.format(cartTotal())}
              </span>
            </div>
          </div>
          <div className="flex-1 items-center flex justify-center md:justify-end px-2 py-2 md:py-0">
            <Link
              to="/checkout"
              className="mr-1 flex-shrink-0 border border-yellow-700 hover:bg-yellow-700  hover:text-white hover:bg-white hover:border-yellow-500 text-sm border-4 text-yellow-700 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Checkout Now
            </Link>
            <Link
              to="/cart"
              className="flex-shrink-0 border border-yellow-700 hover:bg-yellow-700  hover:text-white hover:bg-white gb-yellow-200 hover:border-yellow-500 text-sm border-4 text-yellow-700 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              View Cart
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="text-lg text-yellow-700 font-bold p-1">
            Welcome {user ? "back " + user.displayName : "Guest"}
          </div>
          <div className="text-yellow-800 text-md p-1">
            You do not have any items in your cart as yet. Browse or search
            below to start your shopping list!
          </div>
        </>
      )}
    </div>
  );
};

export default CartSummary;
