import React from "react";

const ProductCard = ({ name, description, image, price }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="max-w-xs w-48 rounded overflow-hidden shadow-lg mx-auto">
      <img src={image} alt={description} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4 flex justify-around">
        <div className="text-lg text-red-400 font-bold">
          {formatter.format(price)}
        </div>
        <button
          className="flex-shrink-0 border border-teal-500 hover:bg-teal-700  hover-text-white bg-white hover:border-teal-700 text-sm border-4 text-teal-500 py-1 px-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
