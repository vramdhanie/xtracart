import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

const Header = () => {
  return (
    <header className="flex justify-between p-1">
      <div className="flex items-center flex-1">
        <MdShoppingCart />
        <NavLink to="/" className="p-1">
          Home
        </NavLink>
        <NavLink to="/cart" className="p-1">
          Cart
        </NavLink>
      </div>
      <div>
        <NavLink to="/login" className="p-1">
          Login
        </NavLink>
      </div>
    </header>
  );
};

export default withRouter(Header);
