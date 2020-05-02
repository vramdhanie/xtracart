import React from "react";
import OrderSummary from "../../components/checkout/orderSummary";
import StoreSelectForm from "../../components/checkout/storeSelectForm";
import ContactForm from "../../components/checkout/contactForm";
import PlaceOrder from "../../components/checkout/placeOrder";

const Checkout = () => {
  return (
    <div className="max-w-5xl mx-auto my-0 p-2 grid grid-cols-1 md:grid-cols-3 gap-2 h-full">
      <div className="md:col-span-2 p-2">
        <h2 className="text-xl font-bold border-b border-gray-400 mb-2">
          Getting your order
        </h2>
        <StoreSelectForm />
        <ContactForm />
        <PlaceOrder />
      </div>
      <OrderSummary />
    </div>
  );
};

export default Checkout;
