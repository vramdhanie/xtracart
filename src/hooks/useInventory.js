import { useState, useEffect } from "react";

function useInventory(db) {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const prodRef = db.collection("products");
    prodRef
      .limit(10)
      .get()
      .then((snapshot) =>
        setInventory(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      );
  }, [db]);

  return { inventory };
}

export default useInventory;
