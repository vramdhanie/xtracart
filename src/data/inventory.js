class Inventory {
  constructor(db) {
    this.items = null;
    this.db = db;
  }

  async fetch() {
    const prodRef = this.db.collection("products");
    await prodRef
      .limit(10)
      .get()
      .then(
        (snapshot) =>
          (this.items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })))
      );
    return this.items;
  }

  async getItems() {
    if (!this.items) {
      return await this.fetch();
    }
    return this.items;
  }
}

export default Inventory;
