import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { add } from "date-fns";
import { COLLECTION_NAMES, LOCAL_STORAGE_NAMES } from "../utilities/constants";

function useCart(db) {
  const user = useAuth();
  const [cart, setCart] = useState([]);
  const [cart_id, setCartId] = useState(null);
  const { CARTS, GUEST_CARTS } = COLLECTION_NAMES;
  const { CART_TOKEN, CART_EXPIRY } = LOCAL_STORAGE_NAMES;

  function mergeCarts(into_cart, other_cart) {
    other_cart.forEach((other_item) => {
      const into_id = into_cart.findIndex((i) => i.id === other_item.id);
      if (into_id > -1) {
        into_cart[into_id] = Object.assign(other_item, into_cart[into_id]);
      } else {
        into_cart.push(other_item);
      }
    });

    return into_cart;
  }

  useEffect(() => {
    function getLocalOrGuestCart() {
      const cart_token = localStorage.getItem(CART_TOKEN);
      const cart_expiry = localStorage.getItem(CART_EXPIRY);
      if (cart_token && cart_expiry && new Date(cart_expiry) > Date.now()) {
        return db
          .collection(GUEST_CARTS)
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
              const local_cart = mergeCarts([...cart], remote_cart);

              return db
                .collection(GUEST_CARTS)
                .doc(data.id)
                .set(
                  {
                    id: data.id,
                    items: local_cart,
                  },
                  { merge: true }
                )
                .then((_) => {
                  localStorage.setItem(CART_TOKEN, data.id);
                  localStorage.setItem(
                    CART_EXPIRY,
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
        return db
          .collection(CARTS)
          .where("user", "==", user.uid)
          .get()
          .then((cartSnapshot) => {
            if (!cartSnapshot.empty) {
              const doc = cartSnapshot.docs[0];
              const user_cart = doc.data().items;
              const user_cart_id = doc.id;
              //merge carts
              const local_cart = mergeCarts(guest_cart, user_cart);
              return db
                .collection(CARTS)
                .doc(user_cart_id)
                .set({
                  items: local_cart,
                  user: user.uid,
                })
                .then(() => {
                  return [local_cart, user_cart_id];
                });
            } else {
              if (id) {
                return db
                  .collection(CARTS)
                  .add({
                    user: user.uid,
                    items: guest_cart,
                  })
                  .then((doc) => {
                    return [guest_cart, doc.id];
                  });
              }
              return [guest_cart, id];
            }
          })
          .then(([user_cart, user_cart_id]) => {
            if (id) {
              localStorage.removeItem(CART_TOKEN);
              localStorage.removeItem(CART_EXPIRY);

              return db
                .collection(GUEST_CARTS)
                .doc(id)
                .delete()
                .then(() => {
                  return [user_cart, user_cart_id];
                });
            } else {
              return [user_cart, user_cart_id];
            }
          });
      }
      return [guest_cart, id];
    }

    getLocalOrGuestCart()
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
    if (user) {
      if (cart_id) {
        db.collection(CARTS)
          .doc(cart_id)
          .set(
            {
              user: user.uid,
              items,
            },
            { merge: true }
          )
          .then(() => {
            setCart(items);
          });
      } else {
        db.collection(CARTS)
          .add({
            user: user.uid,
            items,
          })
          .then((doc) => {
            setCart(items);
            setCartId(doc.id);
          });
      }
    } else {
      if (cart_id) {
        db.collection(GUEST_CARTS)
          .doc(cart_id)
          .set(
            {
              id: cart_id,
              items,
            },
            { merge: true }
          )
          .then(() => {
            localStorage.setItem(CART_EXPIRY, add(new Date(), { days: 7 }));
            setCart(items);
          });
      } else {
        db.collection(GUEST_CARTS)
          .add({
            items,
          })
          .then((doc) => {
            localStorage.setItem(CART_TOKEN, doc.id);
            localStorage.setItem(CART_EXPIRY, add(new Date(), { days: 7 }));
            setCart(items);
            setCartId(doc.id);
          });
      }
    }
  }

  function removeItem(id) {
    const updated_cart = [...cart];
    const index = updated_cart.findIndex((item) => item.id === id);
    if (index > -1) {
      updated_cart.splice(index, 1);
      let collection_name = user ? CARTS : GUEST_CARTS;
      const newObject = {
        id,
        items: updated_cart,
      };
      if (user) {
        newObject.user = user.uid;
      }
      db.collection(collection_name)
        .doc(cart_id)
        .set(newObject)
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
