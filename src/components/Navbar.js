import React from "react";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      burgerMenuOpen: false
    };
  }

  mobileMenu = () => {
    console.log("menu Mobile");
    let nav = document.getElementsByClassName("navbar-item");
    console.log(nav);
  };

  render() {
    console.log("-=-=-=-=-=-", this.props.theUser);

    return (
      <nav
        className="navbar impactNavbar is-spaced impactNavbar"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand  margin-right">
          {/* <p className="impactLogo">IMPACT</p> */}
          <a
            className="navbar-item"
            href="https://impact-sustainability.herokuapp.com/"
          >
            <img src="/impact_logo.png" height="200" />
          </a>
          <a
            role="button"
            onClick={this.mobileMenu}
            className="navbar-burger burger "
            aria-label="menu"
            aria-expanded="false"
            data-target="navMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu is-spaced is-transparent" id="navMenu">
          <div className="navbar-start">
            {this.props.theUser && (
              <div>
                <NavLink to="/" className="navbar-item is-inline margin-right">
                  Home
                </NavLink>
                {/* <NavLink to="/dashboard" className="navbar-item is-inline">
                  Dashboard
                </NavLink> */}
                <NavLink
                  to="/profile"
                  className="navbar-item is-inline margin-right"
                >
                  Profile
                </NavLink>
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
                className="navbar-item is-inline button is-link is-outlined is-spaced"
              >
                Logout
              </button>
            )}

            {!this.props.theUser && (
              <div>
                <NavLink
                  to="/login-page"
                  className="navbar-item is-inline button is-link is-outlined  is-spaced margin-right"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup-page"
                  className="navbar-item is-inline button is-link is-outlined is-spaced"
                >
                  {" "}
                  Signup{" "}
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
