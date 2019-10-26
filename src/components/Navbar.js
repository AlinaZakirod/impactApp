import React from "react";
import Signup from "./user-pages/Signup";
import Login from "./user-pages/Login";
import { NavLink, Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/profile">Profile</NavLink>

        {!this.props.theUser && (
          <div>
            <NavLink to="/login-page">Login</NavLink>
            <NavLink to="/signup-page"> Signup </NavLink>
          </div>
        )}
        {this.props.theUser && (
          <div>
            <button onClick={this.props.doLogout}>Logout</button>
            <NavLink to="/community"> Community </NavLink>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
