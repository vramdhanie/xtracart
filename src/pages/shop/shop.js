import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import ProductCard from "../../components/product/productCard";
import CartSummary from "../../components/cart/cartSummary";

const Shop = () => {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const prodRef = firebase.db.collection("products");
    prodRef
      .limit(10)
      .get()
      .then((snapshot) =>
        setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
  }, [firebase.db]);
  return (
    <div className="">
      <CartSummary />
      <div className="w-11/12 p-2 mx-auto">
        <h2 className="font-bold text-xl text-blue-800 px-4 py-2">Specials</h2>
        <div className="my-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 row-gap-3 col-gap-3">
          {products.length
            ? products.map((product) => (
                <ProductCard {...product} key={product.id} />
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default Shop;
