import React, { Component } from "react";
import axios from "axios";

class Community extends Component {
  constructor(props) {
    super(props);
  }

  getAllUsers = () => {};

  render() {
    return (
      <section className="hero is-fullheight home-bg-img  horizontalCenter">
        <div className="hero-body">
          <div className="container">
            <div>
              <p>hello</p>
              <p>Community!</p>
              {this.getAllUsers}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Community;
