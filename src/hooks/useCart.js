import { useState, useEffect } from "react";
import useAuth from "./useAuth";

function useCart(db) {
  const user = useAuth();
  const [cart, setCart] = useState([]);
  const [guest_cart, setGuestCart] = useState([]);

  // localStorage.setItem("cart_token", 11111);
  // localStorage.setItem("cart_expiry", new Date(2020, 5, 21, 9, 30, 0));

  useEffect(() => {
    // check if a valid cart exist on the local storage
    const cart_token = localStorage.getItem("cart_token");
    const cart_expiry = localStorage.getItem("cart_expiry");
    //if the cart is valid (not expired) fetch from server
    if (cart_token && cart_expiry && new Date(cart_expiry) > Date.now()) {
      db.collection("guest_carts")
        .where("token", "==", cart_token)
        .get()
        .then(
          (snapshot) =>
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0]
        )
        .then((data) => {
          return {
            id: data.id,
            items: data.items.map((item) =>
              db
                .collection("products")
                .doc(item.id)
                .get()
                .then((product) => ({
                  id: product.id,
                  ...product.data(),
                }))
            ),
          };
        })
        .then((data) => {
          setGuestCart(data);
        });
    }

    setCart([]);
  }, [user, db]);
  //1. if user is logged in fetch cart from server
  //2. check for cart in local storage - fetch that from server
  //3. on login, merge the two carts

  function addItem(item) {
    item.quantity = 1;
    item.dateAdded = Date.now();
    const items = [...cart];
    const inCartItem = items.find((i) => i.id === item.id);
    if (inCartItem) {
      inCartItem.quantity++;
    } else {
      items.push(item);
    }
    setCart(items);
  }

  function quantityOfItemInCart(id) {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  }

  function cartTotal() {
    return cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  }

  return { cart, guest_cart, addItem, quantityOfItemInCart, cartTotal };
}

export default useCart;
