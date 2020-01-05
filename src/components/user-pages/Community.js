import React, { Component } from "react";
import axios from "axios";

class Community extends Component {
  constructor(props) {
    super(props);
  }

  getAllUsers = () => {
    axios
      .post(`${process.env.REACT_APP_IMPACT_SERVER}/community`)
      .then(allUsersFromBackend => {
        console.log("Users:", allUsersFromBackend.data);
      })
      .catch(err =>
        console.log("Error while getting users from the backend", err)
      );
  };

  render() {
    return (
      <section className="hero impactFullheight home-bg-img ">
        <div className="hero-body">
          <div className="container">
            <div>
              <p>hello</p>
              <p>Community!</p>
              {this.getAllUsers}
              <p>Users:</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Community;
