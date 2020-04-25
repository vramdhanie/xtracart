import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Shop from "./pages/shop/shop";
import Cart from "./pages/cart/cart";
import Checkout from "./pages/checkout/checkout";
import Product from "./pages/product/product";
import ForgotPassword from "./pages/login/forgotPassword";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import firebase, { FirebaseContext } from "./firebase";
import useAuth from "./hooks/useAuth";
import useCart from "./hooks/useCart";
import Admin from "./pages/admin/admin";
import useInventory from "./hooks/useInventory";
import InventoryContext from "./data/inventoryContext";

function App() {
  const user = useAuth();
  const cartObject = useCart(firebase.db);
  const inventory = useInventory(firebase.db);

  return (
    <Router>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <InventoryContext.Provider value={{ ...cartObject, inventory }}>
          <div className="h-screen flex flex-col w-screen">
            <Header />
            <main className="flex-1">
              <Switch>
                <Route path="/" exact component={Shop} />
                <Route path="/login" component={Login} />
                <Route path="/forgot" component={ForgotPassword} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/cart" component={Cart} />
                <Route path="/product/:id" component={Product} />
                <Route path="/admin" component={Admin} />
              </Switch>
            </main>
            <Footer />
          </div>
        </InventoryContext.Provider>
      </FirebaseContext.Provider>
    </Router>
  );
}

export default App;
