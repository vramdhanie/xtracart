import React, { useContext } from "react";
import InventoryContext from "../../data/inventoryContext";

const CartProduct = ({ name, description, image, price, id }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { quantityOfItemInCart, removeItem } = useContext(InventoryContext);
  const quantity = quantityOfItemInCart(id);
  return (
    <div className="max-w-5xl py-4 border-gray-300 border-solid border-b w-full rounded overflow-hidden  mx-auto flex items-start">
      <div>
        <img src={image} alt={description} className="w-16" />
      </div>
      <div className="px-6 flex-1">
        <div className="font-bold text-xl mb-1">{name}</div>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="flex items-center py-1">
          <div className="text-gray-700 ">
            {quantity} at {formatter.format(price)} each
          </div>
          <button
            className="px-1 flex-shrink-0 text-sm text-teal-700 hover:text-teal-400"
            type="button"
            onClick={() => removeItem(id)}
          >
            Remove
          </button>
        </div>
      </div>
      <div className="px-4 py-4 flex justify-between items-center">
        <div className="text-base text-red-700 font-bold">
          {formatter.format(price * quantity)}
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
