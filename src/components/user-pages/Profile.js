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
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log("State is:", this.state);
  };

  profileQuery = e => {
    e.preventDefault();
    // console.log("ROUTE:", process.env.REACT_API_COOLCLIMATE);

    let newQuery =
      // "http://apis.berkeley.edu/coolclimate/footprint-defaults/?" +
      "&input_location_mode=1&input_location=" +
      // `${this.state.placeType}` +
      // "&input_location=" +
      `${this.state.zipCode}` +
      "&input_income=" +
      `${this.state.income}` +
      "&input_size=" +
      `${this.state.householdSize}` +
      "&op=get_defaults_and_results";
    console.log("QUERY IS:", newQuery);

    axios
      .post(`${process.env.REACT_APP_IMPACT_SERVER}/profile`, newQuery)
      .then(responseFromBackEnd => {
        console.log("Response is:", responseFromBackEnd.data);
      })
      .catch(err => console.log("Error while getting data from CC", err));
    // console.log("QUERY:", newQuery);

    // let user = `${process.env.REACT_API_USERNAME}`;
    // let pass = `${process.env.REACT_API_PASSWORD}`;
    // axios
    //   .post(
    //     newQuery,

    //     {},
    //     {
    //       auth: {
    //         username: user,
    //         password: pass
    //       }
    //     }
    //   )
    //   .then(response => {
    //     console.log("Response is ", response.data);
    //   })
    //   .catch(err => console.log("Error while sending request:", err));
  };

  render() {
    return (
      <section className="hero is-medium">
        <div className="hero-body">
          <h1 className="title is-3">Let's get started!</h1>
          <div class="columns">
            <div class="column"></div>
            <div class="column is-half">
              <form onSubmit={this.profileQuery}>
                {/* <form onSubmit={this.profileQuery(newUpdatedQuery)}> */}

                <div>
                  <div className="field ">
                    <p className="control has-icons-left ">
                      <input
                        className="input"
                        type="number"
                        name="zipCode"
                        placeholder="Type your zip-code"
                        onChange={this.handleChange}
                        value={this.state.zipCode}
                        // value="{
                        //   ('input_location_mode':'1',
                        //   'input_location': '{this.state.zipCode}')}"
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-globe"></i>
                      </span>
                    </p>
                  </div>

                  <div className="field">
                    {/* <label className="label">Do you live in:</label> */}
                    <p className="control has-icons-left  is-medium">
                      <span className="select  is-fullwidth">
                        <select name="income" onChange={this.handleChange}>
                          <option selected className="option" value="1">
                            What is your average annual income?
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
                      </span>
                      <span class="icon is-small is-left">
                        <i class="fa fa-magic"></i>
                      </span>
                    </p>
                  </div>

                  <div className="field">
                    {/* <label className="label">Do you live in:</label> */}
                    <p className="control has-icons-left">
                      <span className="select  is-fullwidth">
                        <select
                          name="householdSize"
                          onChange={this.handleChange}
                        >
                          <option selected className="option" value="1">
                            How many people live in your household?
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
                      </span>
                      <span class="icon is-small is-left">
                        <i class="fa fa-users"></i>
                      </span>
                    </p>
                  </div>
                </div>

                <div className="field">
                  {/* <label className="label">Do you live in:</label> */}
                  <p className="control has-icons-left">
                    <span className="select  is-fullwidth">
                      <select name="placeType" onChange={this.handleChange}>
                        <option selected className="option" value="0">
                          Location by ...
                        </option>
                        <option className="option" value="1">
                          Zip code
                        </option>
                        <option className="option" value="2">
                          City
                        </option>
                        <option className="option" value="3">
                          County
                        </option>
                        <option className="option" value="4">
                          State
                        </option>
                      </select>
                    </span>
                    <span class="icon is-small is-left">
                      <i class="fa fa-home"></i>
                    </span>
                  </p>
                </div>
                <div className="block"></div>
                <div className="block">
                  <p className="control">
                    <button className="button">Submit</button>
                  </p>
                </div>
              </form>
            </div>
            <div class="column"></div>
          </div>
        </div>
      </section>
    );
  }
}

export default Profile;
