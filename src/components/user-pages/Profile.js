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
      total: "",
      houseArea: "",
      waterWage: "",
      milesAYear: "",
      mpg: "",
      shoppingServices: "",
      shoppingMeatFishEggs: "",
      suggested: this.props.suggestedActs,

      categories: this.props.categoriesFromBackEnd,
      currentUser: this.props.currentUser,
      score: "",
      showUpdatedScore: false

      // completedActs: this.props.currentUser.completedActs
    };
  }

  componentDidMount() {
    let theUser = this.props.getTheUser();
    // let suggested = [...this.props.suggestedActs];

    this.setState({
      currentUser: theUser
    });
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
    console.log("State is:", this.state);
  };

  toggleForm = () => {
    this.setState({ detailsUnfolded: !this.state.detailsUnfolded });
  };

  profileQueryStart = e => {
    e.preventDefault();
    // console.log("ROUTE:", process.env.REACT_API_COOLCLIMATE);

    let newQuery =
      // "http://apis.berkeley.edu/coolclimate/footprint-defaults/?" +
      "&input_location_mode=1&input_location=" +
      `${this.state.zipCode}` +
      "&input_income=" +
      `${this.state.income}` +
      "&input_size=" +
      `${this.state.householdSize}` +
      "&op=get_defaults_and_results";
    console.log("QUERY IS:", newQuery);

    axios
      .post(`${process.env.REACT_APP_IMPACT_SERVER}/profile/start`, newQuery)
      .then(responseFromBackEnd => {
        console.log("Response is:", responseFromBackEnd.data);
        this.setState({
          total: responseFromBackEnd.data.total,
          // zipCode: "",
          // householdSize: "",
          // income: "",
          // placeType: "",
          // houseArea: "",
          // waterWage: "",
          milesAYear: "",
          mpg: "",
          shoppingServices: "",
          shoppingMeatFishEggs: "",
          suggestedActs: this.props.currentUser.suggestedActs
        });
      })
      .catch(err => console.log("Error while getting data from CC", err));
  };

  profileQueryHousehold = e => {
    e.preventDefault();
    let newQuery =
      // "http://apis.berkeley.edu/coolclimate/footprint-defaults/?" +
      "&input_location_mode=1&input_location=" +
      `${this.state.zipCode}` +
      "&input_income=" +
      `${this.state.income}` +
      "&input_size=" +
      `${this.state.householdSize}` +
      "&input_footprint_housing_squarefeet=" +
      `${this.state.houseArea}` +
      "&input_footprint_housing_watersewage=" +
      `${this.state.waterWage}` +
      "&op=get_defaults_and_results";
    console.log("Household Query is:", newQuery);
  };

  carbonFootprintGrade = () => {
    if (this.state.total) {
      if (this.state.total < 20) {
        return "'A', Awesome job! Keep it up";
      } else if (this.state.total < 30) {
        return (
          <div>
            <p>'B'</p>
            <p className="">
              Doing great. See Suggested Acts to get even better!
            </p>
          </div>
        );
      } else if (this.state.total < 40) {
        return "'C', You can do better. See Suggested Acts";
      } else if (this.state.total === "") {
        return " ";
      }
    }
  };

  showDetails = () => {
    console.log("Current User", this.state.currentUser);

    // console.log("Completed 2 :", this.props.currentUser.completedActs);
    // console.log("All acts :", this.props.actionsFromBackEnd.allActs);
    let completedWhole = [];
    for (let i = 0; i < this.props.actionsFromBackEnd.allActs.length; i++) {
      for (let y = 0; y < this.props.currentUser.completedActs.length; y++) {
        if (
          this.props.actionsFromBackEnd.allActs[i]._id ===
          this.props.currentUser.completedActs[y]
        ) {
          completedWhole.unshift(this.props.actionsFromBackEnd.allActs[i]);
        }
      }
    }

    console.log("Completed after filter>>>", completedWhole);
    {
      return completedWhole.map((singleAction, i) => {
        return (
          <div className="column is-one-quarter">
            <div className="card" key={i}>
              <header className="card-header">
                <p className="card-header-title  is-centered">
                  {singleAction.title}
                </p>
                <p className="card-header-title is-centered">
                  {singleAction.value}
                </p>
              </header>
              <div className="card-content">
                <div className="content">
                  <p>{singleAction.description}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  handleActNow = singleAct => {
    if (this.props.currentUser && this.props.suggestedActs) {
      this.props.getActIdforActNow(singleAct._id);
      console.log("Pressed Act Value", singleAct.value);
      console.log("Score is before act:", this.props.currentUser.score);
      let updatedScore = this.props.currentUser.score + singleAct.value;
      console.log("Updated score: ", updatedScore);
      console.log("SINGLE ACT ID", singleAct._id);

      let newSuggestedActs = this.props.currentUser.suggestedActs.filter(
        act => act._id !== singleAct._id
      );
      console.log("Old Suggested acts: ", this.props.currentUser.suggestedActs);
      console.log("New Suggested acts: ", newSuggestedActs);

      // const finalActs = this.state.treatedSuggestedActs.filter(
      //   oneAct => oneAct._id !== singleAct._id
      // );
      this.props.getActIdforActNow(singleAct);

      this.setState({
        score: updatedScore,
        showUpdatedScore: true,
        suggested: newSuggestedActs
      });
    }
  };

  openTab = (e, tabId) => {
    console.log("Tab id is.......", tabId);
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    let tablink = document.getElementsByClassName("tablink");
    console.log(",,,,,,,,,,,,,", tablink[0].innerText);
    for (let i = 0; i < tablink.length; i++) {
      tablink[i].className = tablink[i].className.replace("is-active", "");
    }

    e.currentTarget.className += " is-active";
    // console.log("LLLLLL", document.getElementById(tabId));
    // console.log("PPPP", tabId);
    let thisBlock = document.getElementById(tabId);
    console.log("this block", thisBlock);
    // tabId.nextSibling.className += "is-active";
    document.getElementById(tabId).style.display = "block";
  };

  showModal = () => {
    let displayModal = document.getElementById("displayModal");
    let modal = document.getElementById("modal");
    let close = document.getElementsByClassName("modal-close")[0];

    modal.style.display = "block";
  };

  closeModal = () => {
    let modal = document.getElementById("modal");
    let close = document.getElementsByClassName("modal-close")[0];
    modal.style.display = "none";
  };

  render() {
    console.log("!!STATE: ", this.state);
    console.log("!!PROPS:", this.props);

    if (this.props.currentUser !== null) {
      // console.log("Completed:", this.props.currentUser.completedActs);

      console.log("************", this.props.suggestedActs);
      // console.log("############", this.state.suggestedActs);

      let suggestedActs = this.props.suggestedActs.slice(0, 4);
      console.log("%%%%%%%%%%%%%%", suggestedActs);

      console.log("<<<<<<<<<<<<<<<<", this.state.suggested);

      return (
        <section className="hero impactFullheight home-bg-img">
          <div className="hero-body">
            <div className="container">
              <div>
                <p className="subtitle is-1 h1Impact">
                  Hi, {this.props.currentUser.fullName}
                </p>
              </div>

              <section className="section">
                <div className="columns">
                  <div className="column is-two-fifths is-offset-1">
                    <div className="tabs is-centered is-toggle is-fullwidth tabImpact">
                      <ul>
                        <li
                          className="tablink is-active"
                          onClick={e => this.openTab(e, "start")}
                        >
                          <a>
                            <span className="icon is-small">
                              <i
                                className="fa fa-sign-in"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span>Start</span>
                          </a>
                        </li>
                        <li
                          className="tablink"
                          onClick={e => this.openTab(e, "household")}
                        >
                          <a>
                            <span className="icon is-small">
                              <i className="fa fa-home" aria-hidden="true"></i>
                            </span>
                            <span>Household</span>
                          </a>
                        </li>
                        <li
                          className="tablink"
                          onClick={e => this.openTab(e, "commute")}
                        >
                          <a>
                            <span className="icon is-small">
                              <i className="fa fa-car" aria-hidden="true"></i>
                            </span>
                            <span>Commute</span>
                          </a>
                        </li>
                        <li
                          className="tablink"
                          onClick={e => this.openTab(e, "shop")}
                        >
                          <a>
                            <span className="icon is-small">
                              <i
                                className="fa fa-shopping-bag"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span>Shopping</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <form onSubmit={this.profileQueryStart}>
                      <div id="start" className="tabcontent">
                        <h1 className="h4Impact">Let's get started!</h1>

                        <div>
                          <div className="field ">
                            <p className="control has-icons-left ">
                              <input
                                className="input"
                                type="text"
                                name="zipCode"
                                placeholder="Type your zip-code"
                                onChange={this.handleChange}
                                value={this.state.zipCode}
                              />
                              <span className="icon is-small is-left">
                                <i className="fa fa-globe"></i>
                              </span>
                            </p>
                          </div>

                          <div className="field">
                            {/* <label className="label">Do you live in:</label> */}
                            <p className="control has-icons-left is-medium">
                              <span className="select  is-fullwidth">
                                <select
                                  name="income"
                                  onChange={this.handleChange}
                                >
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
                            <button
                              className="button is-link is-outlined"
                              onClick={e => this.openTab(e, "household")}
                            >
                              Next
                            </button>
                          </p>
                        </div>
                      </div>
                      <div className="tabcontent" id="household">
                        <p className="h4Impact">Household Details</p>
                        <div>
                          <div className="field ">
                            <p className="control">
                              <input
                                className="input"
                                type="text"
                                name="houseArea"
                                placeholder="Your House area in Sq Ft"
                                onChange={this.handleChange}
                                value={this.state.houseArea}
                              />
                            </p>
                          </div>

                          {/* <input_footprint_housing_watersewage> */}

                          <div className="field ">
                            <p>
                              <input
                                className="input"
                                type="text"
                                name="waterWage"
                                placeholder="What is your average Water Wage"
                                onChange={this.handleChange}
                                value={this.state.waterWage}
                              />
                            </p>
                          </div>

                          <div className="columns">
                            <div className="column">
                              <button
                                className="button is-link is-outlined"
                                onClick={e => this.openTab(e, "start")}
                              >
                                Previous
                              </button>
                            </div>

                            <div className="column">
                              <button
                                className="button is-link is-outlined"
                                onClick={e => this.openTab(e, "commute")}
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="tabcontent" id="shop">
                        <p className="h4Impact">Shopping</p>
                        <div>
                          {/* <input_footprint_housing_watersewage> */}

                          <div className="field ">
                            <p>
                              <input
                                className="input"
                                type="number"
                                name="shoppingServices"
                                placeholder="$/yr total services"
                                onChange={this.handleChange}
                                value={this.state.shoppingServices}
                              />
                            </p>
                          </div>

                          <div className="field ">
                            <p>
                              <input
                                className="input"
                                type="number"
                                name="shoppingMeatFishEggs"
                                placeholder="$/yr total on meat, fish, eggs"
                                onChange={this.handleChange}
                                value={this.state.shoppingMeatFishEggs}
                              />
                            </p>
                          </div>

                          <div className="columns">
                            <div className="column">
                              <button
                                className="button is-link is-outlined"
                                onClick={e => this.openTab(e, "commute")}
                              >
                                Previous
                              </button>
                            </div>

                            <div className="column">
                              <button className="button impactButton">
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="tabcontent" id="commute">
                        <p className="h4Impact">Commute</p>
                        <div>
                          <div className="field ">
                            <p className="control">
                              <input
                                className="input"
                                type="text"
                                name="milesAYear"
                                placeholder="The number of miles your vehicle travels in a year"
                                onChange={this.handleChange}
                                value={this.state.milesAYear}
                              />
                            </p>
                          </div>

                          <div>
                            <div className="field ">
                              <p className="control">
                                <input
                                  className="input"
                                  type="text"
                                  name="mpg"
                                  placeholder="Your vehicle's fuel efficiency in miles per gallon"
                                  onChange={this.handleChange}
                                  value={this.state.mpg}
                                />
                              </p>
                            </div>

                            <div className="columns">
                              <div className="column">
                                <button
                                  className="button is-link is-outlined"
                                  onClick={e => this.openTab(e, "household")}
                                >
                                  Previous
                                </button>
                              </div>

                              <div className="column">
                                <button
                                  className="button is-link is-outlined"
                                  onClick={e => this.openTab(e, "shopping")}
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="column">
                    {this.state.total && (
                      <div>
                        <p className="h4Impact">
                          Household footprint is{" "}
                          <b className="has-text-grey-darker">
                            {this.state.total}
                          </b>{" "}
                          tons CO<sup>2</sup>eq/year
                        </p>
                        <p className="h5Impact">
                          Your grade is:{" "}
                          <b className="has-text-grey-darker">
                            {this.carbonFootprintGrade()}
                          </b>
                        </p>
                      </div>
                    )}

                    {this.state.showUpdatedScore == false && (
                      <p className="h5Impact">
                        Your score is{" "}
                        <b className="has-text-grey-darker">
                          {this.props.currentUser.score}
                        </b>
                      </p>
                    )}

                    {this.state.showUpdatedScore == true && (
                      <p className="impactTitle title is-6">
                        Your score is {this.state.score}
                      </p>
                    )}

                    <button
                      onClick={this.showModal}
                      className="button is-link is-outlined"
                    >
                      View Details
                    </button>
                  </div>
                  <div className="modal is-clipped" id="modal">
                    <div className="modal-background"></div>
                    <div className="modal-content">
                      <div className="section formModal">
                        <div>
                          <p className="impactTitle title is-3">
                            Your score is {this.props.currentUser.score}
                          </p>
                          <p className="impactTitle title is-5">
                            Completed acts:
                          </p>
                          <div className="columns is-multiline">
                            {this.showDetails()}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={this.closeModal}
                        className="modal-close is-large"
                        aria-label="close"
                      ></button>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="h2Impact">Suggested Acts:</p>
                  <div className="columns  is-8 is-offset-1 is-centered">
                    {suggestedActs.map((singleAct, i) => {
                      return (
                        <div className="column is-3">
                          <div className="card" key={i}>
                            <header className="card-header">
                              <p className="card-header-title">
                                {singleAct.title}
                              </p>
                              <p className="card-score">{singleAct.value}</p>
                            </header>
                            <div className="card-content">
                              <div className="content">
                                <p>{singleAct.description} </p>
                              </div>
                            </div>
                            <footer className="card-footer is-centered">
                              <button
                                className="button  is-fillwidth impactInlineButton"
                                onClick={e => {
                                  this.props.getActIdforActNow(singleAct);
                                }}
                              >
                                Act now!
                              </button>
                            </footer>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      );
    } else return "loading...";
  }
}

export default Profile;
