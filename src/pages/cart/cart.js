import React, { useContext } from "react";
import InventoryContext from "../../data/inventoryContext";
import CartProduct from "../../components/product/cartProduct";
import { Link } from "react-router-dom";

const Cart = () => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const { cart, cartTotal } = useContext(InventoryContext);
  return (
    <div className="p-4 max-w-5xl mx-auto my-0">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold my-1 text-blue-900">Shopping Cart</h1>
        {cart.length ? (
          <div className="items-center flex justify-end px-2 flex-col md:flex-row">
            <Link
              to="/checkout"
              className="mr-1 flex-shrink-0 border hover:border-yellow-700 bg-yellow-500 hover:bg-yellow-600 text-black  border-yellow-800 text-sm border-4 hover:text-gray-800 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to checkout
            </Link>
            <Link
              to="/"
              className="flex-shrink-0 border border-yellow-700 hover:bg-yellow-700  hover:text-white hover:bg-white gb-yellow-200 hover:border-yellow-500 text-sm border-4 text-yellow-700 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed mt-2 md:mt-0"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      {cart.length ? (
        <div className="px-4 text-sm text-gray-600 text-right border-gray-300 border-solid border-b">
          Price
        </div>
      ) : (
        ""
      )}
      <div className="py-2">
        {cart.length ? (
          <div>
            {cart.map((product) => (
              <CartProduct {...product} key={product.id} />
            ))}
            <div className="text-right py-2 px-4">
              Cart subtotal ({cart.length} item{cart.length !== 1 && "s"}):{" "}
              <span className="text-base text-red-700 font-bold">
                {formatter.format(cartTotal())}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 text-center">
            <div className="text-lg font-bold text-teal-800">
              Your cart is empty
            </div>
            <div className="p-8">
              <Link
                to="/"
                className="mr-1 flex-shrink-0 border hover:border-yellow-700 bg-yellow-500 hover:bg-yellow-600 text-black  border-yellow-800 text-sm border-4 hover:text-gray-800 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Shop now!
              </Link>
            </div>
          </div>
        )}
      </div>
      {cart.length ? (
        <div className="items-center flex justify-end px-2">
          <Link
            to="/checkout"
            className="mr-1 flex-shrink-0 border hover:border-yellow-700 bg-yellow-500 hover:bg-yellow-600 text-black  border-yellow-800 text-sm border-4 hover:text-gray-800 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to checkout
          </Link>
          <Link
            to="/"
            className="flex-shrink-0 border border-yellow-700 hover:bg-yellow-700  hover:text-white  gb-yellow-200 hover:border-yellow-500 text-sm border-4 text-yellow-700 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
