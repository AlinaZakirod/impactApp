import React, { Component } from "react";
import axios from "axios";

class Community extends Component {
  constructor(props) {
    super(props);
  }

  getAllUsers = () => {
    console.log("blah");
    axios
      .get(`${process.env.REACT_APP_IMPACT_SERVER}/community`)
      .then(allUsersFromBackend => {
        console.log("Users:", allUsersFromBackend.data);
      })
      .catch(err =>
        console.log("Error while getting users from the backend", err)
      );
  };

  // getAllCategories = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_IMPACT_SERVER}/category/allCats`)
  //     .then(responseCategories => {
  //       console.log(
  //         "Categories from DB: ",
  //         responseCategories.data.allCategories
  //       );
  //       this.setState({
  //         categoriesFromBackEnd: responseCategories.data.allCategories
  //       });
  //     })
  //     .catch(err => console.log("Err while getting categories: ", err));
  // };

  render() {
    return (
      <section className="hero impactFullheight home-bg-img is-fullheight">
        <div className="hero-body">
          <div>
            <p>hello</p>
            <p>Community!</p>
            <p>Users:</p>
            {this.getAllUsers}
          </div>
        </div>
      </section>
    );
  }
}

export default Community;
