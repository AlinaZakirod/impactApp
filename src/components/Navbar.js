import React from "react";
import { NavLink } from "react-router-dom";

class Navbar extends React.Component {
  render() {
    console.log("-=-=-=-=-=-", this.props.theUser);

    return (
      //       <nav class="navbar" role="navigation" aria-label="main navigation">
      //   <div class="navbar-brand">
      //     <a class="navbar-item" href="https://bulma.io">
      //       <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
      //     </a>

      //     <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      //       <span aria-hidden="true"></span>
      //       <span aria-hidden="true"></span>
      //       <span aria-hidden="true"></span>
      //     </a>
      //   </div>

      //   <div id="navbarBasicExample" class="navbar-menu">
      //     <div class="navbar-start">
      //       <a class="navbar-item">
      //         Home
      //       </a>

      //       <a class="navbar-item">
      //         Documentation
      //       </a>

      //       <div class="navbar-item has-dropdown is-hoverable">
      //         <a class="navbar-link">
      //           More
      //         </a>

      //         <div class="navbar-dropdown">
      //           <a class="navbar-item">
      //             About
      //           </a>
      //           <a class="navbar-item">
      //             Jobs
      //           </a>
      //           <a class="navbar-item">
      //             Contact
      //           </a>
      //           <hr class="navbar-divider">
      //           <a class="navbar-item">
      //             Report an issue
      //           </a>
      //         </div>
      //       </div>
      //     </div>

      //     <div class="navbar-end">
      //       <div class="navbar-item">
      //         <div class="buttons">
      //           <a class="button is-primary">
      //             <strong>Sign up</strong>
      //           </a>
      //           <a class="button is-light">
      //             Log in
      //           </a>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </nav>
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
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="navbar-menu is-spaced is-transparent ">
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
