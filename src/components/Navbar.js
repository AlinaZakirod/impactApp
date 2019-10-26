import React from "react";
import Signup from "./user-pages/Signup";
import Login from "./user-pages/Login";
import { Switch, Route, Link } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <a href="/">Home</a>
        {!this.props.theUser && (
          <div>
            <Link to="/login-page">Login</Link>
            <Link to="/signup-page"> Signup </Link>
          </div>
        )}
        {this.props.theUser && (
          <button onClick={this.props.doLogout}>Logout</button>
        )}
      </div>
    );
  }
}

export default Navbar;
