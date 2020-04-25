import Inventory from "../data/inventory";

function useInventory(db) {
  const inventory = new Inventory(db);
  inventory.fetch();
  return inventory;
}

export default useInventory;
