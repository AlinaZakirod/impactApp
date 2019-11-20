import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: "",
      householdSize: "",
      income: "",
      placeType: "",
      total: ""
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log("State is:", this.state);
  };

  toggleForm = () => {
    this.setState({ detailsUnfolded: !this.state.detailsUnfolded });
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
        this.setState({
          total: responseFromBackEnd.data.total,
          zipCode: "",
          householdSize: "",
          income: "",
          placeType: ""
        });
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
    console.log("total:", this.state.total);
    console.log("User in PROFILE:", this.props.currentUser);
    if (this.props.currentUser !== null) {
      return (
        <section className="hero is-medium horizontalCenter is-10">
          <div className="hero-body">
            <div className="block">
              <p className="impactTitle title is-2">
                Hi there, {this.props.currentUser.fullName}
              </p>
            </div>
            <div class="columns">
              <div class="column is-two-fifths is-offset-1">
                <h1 className="impactTitle title is-4 ">Let's get started!</h1>
                {/* <h2>Total is: {this.state.total}</h2> */}
                <form onSubmit={this.profileQuery}>
                  {/* <form onSubmit={this.profileQuery(newUpdatedQuery)}> */}

                  <div>
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

                    <div className="field ">
                      <p className="control has-icons-left ">
                        <input
                          className="input"
                          type="text"
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

                  <div className="block"></div>
                  <div className="block">
                    <p className>
                      <button className="button">Submit</button>
                    </p>
                  </div>
                </form>
              </div>
              <div className="column">
                <p className="impactTitle title is-5">
                  Annual carbon footprint of your household is{" "}
                  {this.state.total}
                </p>
                <p className="impactTitle title is-6">
                  Your Impact score is: {this.props.currentUser.score}
                </p>

                {!this.state.detailsUnfolded &&
                  this.props.currentUser.score > 0 && (
                    <button
                      className="button impactButton"
                      onClick={this.toggleForm}
                    >
                      View Details
                    </button>
                  )}
                {this.state.detailsUnfolded && (
                  <div>
                    <p>Completed acts:</p>
                    {this.props.currentUser.completedActs.map(singleAction => {
                      return (
                        <div>
                          <p>{singleAction}</p>

                          <div key={singleAction._id}>
                            <b>{singleAction.title}</b> {singleAction.value}
                          </div>
                        </div>
                      );
                    })}
                    <button className="button" onClick={this.toggleForm}>
                      Show Less
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="content">
              <p className="impactTitle title is-5">Suggested Acts:</p>
              <div className="columns  is-8 is-offset-1">
                {this.props.currentUser.suggestedActs.map((singleAct, i) => {
                  return (
                    <div className="column is-3">
                      <div className="card" key={i}>
                        <header className="card-header">
                          <p className="card-header-title is-centered">
                            {singleAct.title}
                          </p>
                        </header>
                        <div className="card-content">
                          <div className="content">
                            <p>{singleAct.description}</p>
                          </div>
                        </div>
                        <footer className="card-footer is-centered">
                          <button
                            className="button  is-fillwidth impactInlineButton"
                            onClick={e => {}}
                          >
                            Act now!
                          </button>
                        </footer>
                      </div>
                    </div>
                  );
                })}
                {/* {this.props.currentUser.suggestedActs.map((oneAct, i) => {
                  return (
                    <div>
                      <div key={i}>
                        {oneAct.title}

                        {oneAct.value}

                        {oneAct.category.title}
                      </div>
                    </div>
                  );
                })} */}
              </div>
            </div>
          </div>
        </section>
      );
    } else return "loading...";
  }
}

export default Profile;
