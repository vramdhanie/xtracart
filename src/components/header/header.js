import React, { useContext } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import logo from "../../images/full_logo.png";
import { FirebaseContext } from "../../firebase";

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);

  return (
    <header className="flex justify-between p-1 border-b">
      <div className="flex items-center flex-1">
        <NavLink to="/" className="p-1">
          <img src={logo} className="w-32" alt="xtracart logo" />
        </NavLink>
      </div>
      <div className="flex items-center">
        <NavLink to="/admin" className="p-1 hover:text-teal-500">
          Admin
        </NavLink>

        <NavLink
          to="/cart"
          className="p-1 flex items-center hover:text-teal-500"
        >
          <MdShoppingCart /> Cart
        </NavLink>
        <div className="px-1">|</div>
        {user ? (
          <>
            <div>{user.displayName}</div>
            <div className="px-1">|</div>
            <div
              className="cursor-pointer hover:text-teal-500"
              onClick={() => firebase.logout()}
            >
              logout
            </div>
          </>
        ) : (
          <NavLink to="/login" className="p-1 hover:text-teal-500">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default withRouter(Header);
