import React, { useContext } from "react";
import InventoryContext from "../../data/inventoryContext";

const ProductCard = ({ name, description, image, price, id }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const { cart, addItem, quantityOfItemInCart } = useContext(InventoryContext);

  const handleAddToCart = () => {
    const item = { id, name, description, image, price };
    addItem(item);
  };

  const quantity = quantityOfItemInCart(id);

  return (
    <div className="max-w-xs w-full rounded overflow-hidden  mx-auto flex flex-col shadow-lg">
      {!!quantity && (
        <div className="bg-gray-300 self-end p-1 text-gray-700 rounded-bl">
          {quantity} in cart
        </div>
      )}
      <img src={image} alt={description} className="w-full" />
      <div className="px-6 py-4 flex-1">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-4 py-4 flex justify-between items-center">
        <div className="text-lg text-red-400 font-bold">
          {formatter.format(price)}
        </div>
        <button
          className="flex-shrink-0 border border-teal-500 hover:bg-teal-700  hover-text-white bg-white hover:border-teal-700 text-sm border-4 text-teal-500 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
