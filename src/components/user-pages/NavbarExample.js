import React, { Component } from "react";

class NavExample extends Component {
  state = {};
  render() {
    return (
      <nav
        className="navbar is-transparent is-fixed-top is-spaced"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand"></div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a class="navbar-item">Home</a>
            <a class="navbar-item">Dashboard</a>
            <a class="navbar-item">Profile</a>
            <a class="navbar-item">Community</a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a class="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a class="button is-light">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavExample;
