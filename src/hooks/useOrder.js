import { useEffect, useState } from "react";
import { COLLECTION_NAMES } from "../utilities/constants";

function useOrder(uid, db) {
  const [orders, setOrders] = useState([]);
  const { ORDERS } = COLLECTION_NAMES;

  useEffect(() => {
    db.collection(ORDERS)
      .where("user", "==", uid)
      .where("archived", "==", false)
      .get()
      .then((snapshot) =>
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      );
  }, []);

  function addOrder(order, uid, db) {
    order.user = uid;
    order.archived = false;
    order.created = Date.now();

    return db
      .collection(ORDERS)
      .add(order)
      .then((doc) => {
        setOrders((prev) => [...prev, { id: doc.id, ...doc.data() }]);
        
      });
  }

  return { orders };
}

export default useOrder;
