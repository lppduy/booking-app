import React from "react";
import "./NavBarHeader.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAuthUser } from "../../util/token";
function NavBarHeader() {
  const user = getAuthUser();
  console.log(user);
  const navigate = useNavigate();
  //click logout
  const clickLogoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/auth?mode=login");
  };

  return (
    <div className="navbar-header">
      <h3 className="navbar-header__title">
        <Link to=""> Booking Website</Link>
      </h3>
      <div className="navbar-header__button">
        {!user && (
          <NavLink to="/auth?mode=signup" className="button-register">
            Sign Up
          </NavLink>
        )}
        {user && (
          <>
            <p>{user.username}</p>
            <NavLink to="/transaction">Transaction</NavLink>
          </>
        )}
        {user && (
          <button
            type="button"
            onClick={clickLogoutHandler}
            className="button-logout"
          >
            Logout
          </button>
        )}
        {!user && (
          <NavLink to={`/auth?mode=login`} className="button-login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
}
export default NavBarHeader;
