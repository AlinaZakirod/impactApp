import React from "react";
import { NavLink, Link } from "react-router-dom";
import CategoryList from "./category-components/CategoryList";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/">Home</NavLink>

        {!this.props.theUser && (
          <div>
            <NavLink to="/login-page">Login</NavLink>
            <NavLink to="/signup-page"> Signup </NavLink>
          </div>
        )}
        {this.props.theUser && (
          <div>
            <NavLink to="/dashboard">Dashboard</NavLink>
            {/* <NavLink to="/profile">Profile</NavLink> */}
            <NavLink to="/community"> Community </NavLink>
            {/* <NavLink to="/act/add"> Add Act </NavLink> */}
            <button onClick={this.props.doLogout}>Logout</button>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;