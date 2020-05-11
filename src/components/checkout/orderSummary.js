import React, { useContext } from "react";
import InventoryContext from "../../data/inventoryContext";

const OrderSummary = ({ location, time }) => {
  const { cart, cartTotal } = useContext(InventoryContext);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="py-2 px-1">
      <h2 className="font-semibold text-lg">Order Summary</h2>
      <div className="border border-gray-400 p-1 rounded shadow">
        <div className="text-sm text-gray-600">
          To pick up {location ? `at ${location}` : ""}
        </div>
        <div className="my-1">
          {cart.map(({ id, image, name, description, quantity, price }) => (
            <div
              key={id}
              className="text-sm flex mb-1 border-gray-200 border-b py-1"
            >
              <div>
                <img src={image} alt={description} className="w-12" />
              </div>
              <div className="flex-1 px-1">
                <div>{name}</div>
                <div>Qty: {quantity}</div>
              </div>
              <div className="text-right text-red-600">
                {formatter.format(price * quantity)}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-1 pr-1 flex justify-between text-xl font-bold">
          <div>Total</div>
          <div className="text-red-800">{formatter.format(cartTotal())}</div>
        </div>
        <div className="text-right px-1 text-xs text-gray-400">estimated</div>
      </div>
    </div>
  );
};

export default OrderSummary;
