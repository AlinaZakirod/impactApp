import React, { Component } from "react";
import axios from "axios";
import { thisExpression } from "@babel/types";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: "",
      householdSize: "",
      income: "",
      placeType: "",
      total: "",
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
          placeType: "",
          suggestedActs: this.props.currentUser.suggestedActs
        });
      })
      .catch(err => console.log("Error while getting data from CC", err));
  };

  carbonFootprintGarde = () => {
    if (this.state.total) {
      if (this.state.total < 17) {
        return "'A', Awesome job! Keep it up";
      } else if (this.state.total > 20) {
        return "'B, Doing great. See Suggested Acts to get even better!'";
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
          <div className="column is-half">
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
    // {
    //   completedWhole.map((oneAct, i) => {
    //     console.log("Mapping whole acts: ", oneAct);
    //     return (
    //       <div>
    //         <p>Something here</p>
    //       </div>
    //       // <div className="column is-2">
    //       //   <p>Blah</p>
    //       //   <div className="card" key={i}>
    //       //     <header className="card-header">
    //       //       <p className="card-header-title is-centered">{oneAct.title}</p>
    //       //     </header>
    //       //     <div className="card-content">
    //       //       <div className="content">
    //       //         <p>{oneAct.description}</p>
    //       //       </div>
    //       //     </div>
    //       //   </div>
    //       // </div>
    //     );
    //   });
    // }
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
    let tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    let tablink = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablink.length; i++) {
      tablink[i].className = tablink[i].className.replace("is-active", "");
    }

    document.getElementById(tabId).style.display = "block";
    e.currentTarget.className += "is-active";
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
        <section className="hero is-fullheight home-bg-img  horizontalCenter">
          <div className="hero-body">
            <div className="container">
              <div>
                <p className="subtitle is-1 h1Impact">
                  Hi, {this.props.currentUser.fullName}
                </p>
                <p className="subtitle is-3 h1Impact">
                  You're making an impact
                </p>
              </div>

              <section className="section">
                <div className="columns">
                  <div className="column is-two-fifths is-offset-1">
                    <div className="tabs is-centered is-toggle is-fullwidth">
                      <ul>
                        <li
                          className="is-active tablink"
                          onClick={e => this.openTab(e, "start")}
                        >
                          <a>
                            <span className="icon is-small">
                              <i className="fa fa-image" aria-hidden="true"></i>
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
                              <i className="fa fa-music" aria-hidden="true"></i>
                            </span>
                            <span>Music</span>
                          </a>
                        </li>
                        <li
                          className="tablink"
                          onClick={e => this.openTab(e, "transport")}
                        >
                          <a>
                            <span className="icon is-small">
                              <i className="fa fa-film" aria-hidden="true"></i>
                            </span>
                            <span>Videos</span>
                          </a>
                        </li>
                        <li className="tablink">
                          <a>
                            <span className="icon is-small">
                              <i
                                className="fa fa-file-alt"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <span>Documents</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div id="start" className="tabcontent">
                      <h1 className="h4Impact">Let's get started!</h1>
                      {/* <h2>Total is: {this.state.total}</h2> */}
                      <form onSubmit={this.profileQuery}>
                        {/* <form onSubmit={this.profileQuery(newUpdatedQuery)}> */}

                        <div>
                          <div className="field">
                            {/* <label className="label">Do you live in:</label> */}
                            <p className="control has-icons-left">
                              <span className="select  is-fullwidth">
                                <select
                                  name="placeType"
                                  onChange={this.handleChange}
                                >
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
                            <button className="button impactButton ">
                              Submit
                            </button>
                          </p>
                        </div>
                      </form>
                    </div>
                    <div className="tabconent" id="fa">
                      <p>Fa-la-la-la-la</p>
                    </div>
                    <div className="tabconent" id="la">
                      <p>La-la-la-la</p>
                    </div>
                  </div>
                  <div className="column">
                    <p className="h4Impact">
                      Annual footprint of your household is{" "}
                      <b className="has-text-grey-darker">{this.state.total}</b>
                    </p>
                    <p className="h5Impact">
                      Your grade is:{" "}
                      <b className="has-text-grey-darker">
                        {this.carbonFootprintGarde()}
                      </b>
                    </p>

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

                    {!this.state.detailsUnfolded &&
                      this.props.currentUser.score > 0 && (
                        <button
                          className="button is-link is-outlined"
                          onClick={this.toggleForm}
                        >
                          View Details
                        </button>
                      )}
                    {this.state.detailsUnfolded && (
                      <div>
                        <p className="impactTitle title is-5">
                          Completed acts:
                        </p>
                        <div className="columns is-centered is-multiline">
                          {this.showDetails()}
                        </div>
                        <button
                          className="button is-link is-outlined"
                          onClick={this.toggleForm}
                        >
                          Show Less
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="content">
                  <p className="h2Impact">Suggested Acts:</p>
                  <div className="columns  is-8 is-offset-1 is-centered">
                    {suggestedActs.map((singleAct, i) => {
                      return (
                        <div className="column is-3">
                          <div className="card" key={i}>
                            <header className="card-header">
                              <p className="card-header-title is-centered">
                                {singleAct.title}
                                {singleAct.value}
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
                                onClick={e => {
                                  this.handleActNow(singleAct);
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
