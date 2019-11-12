import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: "",
      householdSize: "",
      income: "",
      placeType: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  profileQuery = () => {
    console.log("Blah");
    let newQuery =
      "apis.berkeley.edu/coolclimate/footprint-defaults/?" +
      "input_location_mode=" +
      `${this.state.placeType}` +
      "&input_location=" +
      `${this.state.zipCode}` +
      "&input_income=" +
      `${this.state.income}` +
      "&input_size=" +
      `${this.state.householdSize}`;

    console.log("Query is:", newQuery);

    let u = "fe1b79e6";
    let p = "7a47e4702a27b760f91378195e86012d";
    axios
      .post(
        newQuery,
        {},
        {
          auth: {
            username: u,
            password: p
          }
        }
      )
      .then(response => console.log("Response is: ", response.data))
      .catch(err => console.log("Error while sending request:", err));
  };

  render() {
    console.log("State is:", this.state);
    // let newQuery =
    //   "apis.berkeley.edu/coolclimate/footprint-defaults/?" +
    //   "input_location_mode=" +
    //   `${this.state.placeType}` +
    //   "&input_location=" +
    //   `${this.state.zipCode}` +
    //   "&input_income=" +
    //   `${this.state.income}` +
    //   "&input_size=" +
    //   `${this.state.householdSize}`;

    // console.log("Query is:", newQuery);
    return (
      <div className="container is-half is-centered">
        <div>
          <h1 className="title is-3">Let's get started!</h1>
        </div>

        <form onSubmit={this.profileQuery}>
          <div>
            <div className="select is-fullwidth">
              {/* <label className="label">Do you live in:</label> */}
              <select name="placeType" onChange={this.handleChange}>
                <option className="option" value="1">
                  Downtown
                </option>
                <option className="option" value="2">
                  City
                </option>
                <option className="option" value="3">
                  Subborbs
                </option>
                <option className="option" value="4">
                  Village
                </option>
              </select>
            </div>

            <div className="">
              <label className="label">Where do you live?</label>
              <input
                className="input"
                type="number"
                name="zipCode"
                placeholder="Type your zip-code"
                onChange={this.handleChange}
                value={this.state.zipCode}
              />
            </div>

            <div className="select is-fullwidth">
              {/* <label className="label">
                What is your gross annual household income?
              </label> */}
              <select name="income" onChange={this.handleChange}>
                <option className="option" value="1">
                  Average
                </option>
                <option className="option" value="2">
                  Less than $10,000
                </option>
                <option className="option" value="3">
                  $10,000 to $19,999
                </option>
                <option className="option" value="4">
                  $20,000 to $29,999
                </option>
                <option className="option" value="5">
                  $30,000 to $39,999
                </option>
                <option className="option" value="6">
                  $40,000 to $49,999
                </option>
                <option className="option" value="7">
                  $50,000 to $59,999
                </option>
                <option className="option" value="8">
                  $60,000 to $79,999
                </option>
                <option className="option" value="9">
                  $80,000 to $99,999
                </option>
                <option className="option" value="10">
                  $100,000 to $119,999
                </option>
                <option className="option" value="11">
                  $120,000 or more
                </option>
              </select>
            </div>

            <div className="select is-fullwidth">
              {/* <label className="label">
                How many people live in your household?
              </label> */}
              <select name="householdSize" onChange={this.handleChange}>
                <option className="option" value="0">
                  Average
                </option>
                <option className="option" value="1">
                  1 person
                </option>
                <option className="option" value="2">
                  2 people
                </option>
                <option className="option" value="3">
                  3 people
                </option>
                <option className="option" value="4">
                  4 people
                </option>
                <option className="option" value="5">
                  5 or more people
                </option>
              </select>
            </div>
          </div>
          <button className="button">Submit</button>
        </form>
      </div>
    );
  }
}

export default Profile;
