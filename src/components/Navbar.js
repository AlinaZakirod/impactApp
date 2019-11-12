import React from "react";
import { NavLink } from "react-router-dom";
import CategoryList from "./category-components/CategoryList";

class Navbar extends React.Component {
  render() {
    console.log("-=-=-=-=-=-", this.props.theUser);

    return (
      <div className="navbar-menu is-spaced">
        <div className="navbar-start">
          {this.props.theUser && (
            <div>
              <NavLink to="/" className="navbar-item is-inline">
                Home
              </NavLink>
              <NavLink to="/dashboard" className="navbar-item is-inline">
                Dashboard
              </NavLink>
              {/* <NavLink to="/profile">Profile</NavLink> */}
              <NavLink to="/community" className="navbar-item is-inline">
                Community
              </NavLink>
            </div>
          )}
        </div>

        <div className="navbar-end">
          {this.props.theUser && (
            <button
              onClick={this.props.doLogout}
              className="button is-transparent is-radiusless"
            >
              Logout
            </button>
          )}

          {!this.props.theUser && (
            <div>
              <NavLink to="/login-page" className="navbar-item is-inline">
                Login
              </NavLink>
              <NavLink to="/signup-page" className="navbar-item is-inline">
                {" "}
                Signup{" "}
              </NavLink>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
