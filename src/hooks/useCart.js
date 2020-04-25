import { useState, useEffect } from "react";
import useAuth from "./useAuth";

function useCart(db) {
  const user = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // check if a valid cart exist on the local storage
    const cart_token = localStorage.getItem("cart_token");
    const cart_expiry = localStorage.getItem("cart_expiry");
    //if the cart is valid (not expired) fetch from server
    if (cart_token && cart_expiry && new Date(cart_expiry) > Date.now()) {
      //   db.collection("guest_carts").where("token", "==", cart_token)
      //   .then(snapshot => {
      //       let prod_ref = db.child('product/' + )
      //   })
    }

    setCart([]);
  }, [user]);
  //1. if user is logged in fetch cart from server
  //2. check for cart in local storage - fetch that from server
  //3. on login, merge the two carts

  function addItem(item) {
    setCart((prevCart) => [...prevCart, item]);
  }

  return [cart, addItem];
}

export default useCart;
