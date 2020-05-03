import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { add } from "date-fns";

function useCart(db) {
  const user = useAuth();
  const [cart, setCart] = useState([]);
  const [cart_id, setCartId] = useState(null);

  function getLocalorGuestCart() {
    const cart_token = localStorage.getItem("cart_token");
    const cart_expiry = localStorage.getItem("cart_expiry");
    if (cart_token && cart_expiry && new Date(cart_expiry) > Date.now()) {
      return db
        .collection("guest_carts")
        .doc(cart_token)
        .get()
        .then((cart_snapshot) => ({
          id: cart_snapshot.id,
          ...cart_snapshot.data(),
        }))

        .then((data) => {
          const remote_cart = data.items;
          if (cart.length) {
            //merge carts
            const local_cart = [...cart];
            remote_cart.forEach((remote_item) => {
              const local_id = local_cart.findIndex(
                (i) => i.id === remote_item.id
              );
              if (local_id > -1) {
                local_cart[local_id] = Object.assign(
                  remote_item,
                  local_cart[local_id]
                );
              } else {
                local_cart.push(remote_item);
              }
            });
            return db
              .collection("guest_carts")
              .doc(data.id)
              .set(
                {
                  id: data.id,
                  items: local_cart,
                },
                { merge: true }
              )
              .then((_) => {
                localStorage.setItem("cart_token", data.id);
                localStorage.setItem(
                  "cart_expiry",
                  add(new Date(), { days: 7 })
                );
                return [local_cart, data.id];
              });
          } else {
            return [remote_cart, data.id];
          }
        });
    } else {
      return Promise.resolve([[], null]);
    }
  }

  function getCartForLoggedInUser([guest_cart, id]) {
    if (user) {
      // check if the user has an active cart and fetch it
      // then, if a guest_cart exist we need to merge the two carts
      // then delete the guest cart, delete the local storage
    }
    return [guest_cart, id];
  }

  useEffect(() => {
    getLocalorGuestCart()
      .then(getCartForLoggedInUser)
      .then(([cart, id]) => {
        setCart(cart);
        setCartId(id);
      });
  }, [user, db]);

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

  function removeItem(id) {
    const updated_cart = [...cart];
    const index = updated_cart.findIndex((item) => item.id === id);
    if (index > -1) {
      updated_cart.splice(index, 1);
      let collection_name = user ? "cart" : "guest_cart";
      db.collection(collection_name)
        .doc(cart_id)
        .set({ id, items: updated_cart })
        .then(() => {
          setCart(updated_cart);
        });
    }
  }

  function quantityOfItemInCart(id) {
    const item = cart.find((i) => i.id === id);
    return item ? item.quantity : 0;
  }

  function cartTotal() {
    return cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  }

  return { cart, addItem, removeItem, quantityOfItemInCart, cartTotal };
}

export default useCart;
