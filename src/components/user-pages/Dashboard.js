import React from "react";
import axios from "axios";
import Profile from "./Profile";
// import { Link } from "react-router-dom";
// import { handleChangeAct } from "../category-components/CategoryDetails";

class Dashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // treatedSuggestedActs: null,
      detailsUnfolded: false,
      completedActs: this.props.completedActs,
      categoriesFromBackEnd: this.props.categoriesFromBackEnd,
      currentUser: ""
    };
  }

  componentDidMount() {
    let theUser = this.props.getTheUser();
    this.setState({
      currentUser: theUser
    });
  }

  // componentDidMount() {
  //   let userSuggestedActs = [];
  //   // console.log("1.-=-=-=-=-=", this.state.suggestedActs[1]);
  //   // console.log("2.-=-=-=-=-=", this.props.actionsFromBackEnd.allActs[1]._id);
  //   for (let i = 0; i < this.props.currentUser.suggestedActs.length; i++) {
  //     for (let y = 0; y < this.props.actionsFromBackEnd.allActs.length; y++) {
  //       if (
  //         this.props.actionsFromBackEnd.allActs[y]._id ===
  //         this.props.currentUser.suggestedActs[i]
  //       ) {
  //         userSuggestedActs.unshift(this.props.actionsFromBackEnd.allActs[y]);
  //         // console.log("3.-=-=-=-=-=", userSuggestedActs);
  //       }
  //     }
  //   }
  //   // console.log("****", userSuggestedActs);
  //   for (let i = 0; i < userSuggestedActs.length; i++) {
  //     for (let y = 0; y < this.state.categoriesFromBackEnd.length; y++) {
  //       if (
  //         userSuggestedActs[i].category ===
  //         this.state.categoriesFromBackEnd[y]._id
  //       ) {
  //         console.log("BLA-BLA-BLA");
  //         console.log("Title is :", this.state.categoriesFromBackEnd[y].title);
  //         // userSuggestedActs[1].category = `${this.state.categoriesFromBackEnd[y].title}`;
  //         let withCategoryTitles = {};
  //       }
  //     }
  //   }
  //   // console.log("+++++", userSuggestedActs);

  //   console.log("Category Name?: ", userSuggestedActs);

  //   this.setState(
  //     {
  //       treatedSuggestedActs: userSuggestedActs
  //     },
  //     () => console.log("####", this.state.treatedSuggestedActs)
  //   );
  // }

  // getLessSuggestedActs = () => {
  //   // this.actTreatment();
  //   console.log("All", this.state.treatedSuggestedActs);
  //   if (this.state.treatedSuggestedActs !== null) {
  //     // const fourActs = this.state.treatedSuggestedActs.slice(0, 4);
  //     // console.log("4:", fourActs);

  //     console.log("cut suggested acts:", this.state.treatedSuggestedActs);

  //     return (
  //       <div>
  //         <p>Suggested Acts:</p>
  //         {this.state.treatedSuggestedActs
  //           .filter((singledSuggestedAct, i) => i < 5)
  //           .map((singledSuggestedAct, i) => {
  //             return (
  //               <div>
  //                 <h4>
  //                   <b>{singledSuggestedAct.title}</b>{" "}
  //                 </h4>
  //                 <p>{singledSuggestedAct.value}</p>

  //                 <p>{singledSuggestedAct.description}</p>
  //                 <button
  //                   onClick={e => {
  //                     this.handleChangeAct(singledSuggestedAct._id);
  //                   }}
  //                 >
  //                   Act Now!
  //                 </button>
  //               </div>
  //             );
  //           })}
  //         {/* <button onClick={this.getAllSuggestedActs}>
  //           View All suggested Acts
  //         </button> */}
  //       </div>
  //     );
  //   }
  // };

  handleChangeAct = actId => {
    console.log("SUGGESTED ACTS IN DASHBOARD:", this.props.suggestedActs);
    if (this.state.treatedSuggestedActs !== null) {
      const finalActs = this.state.treatedSuggestedActs.filter(
        singleAct => singleAct._id !== actId
      );

      // how to get the value of the act? than update the score
      const currentAct = this.state.treatedSuggestedActs.filter(
        singleAct => singleAct._id === actId
      );

      console.log("SCORE", this.state.score);
      const updateScore = currentAct[0].value + this.state.score;
      console.log("To add", updateScore);
      axios
        .post(
          `${process.env.REACT_APP_IMPACT_SERVER}/act/${actId}/update`,
          {},
          {
            withCredentials: true
          }
        )

        .then(() => {
          this.setState({
            treatedSuggestedActs: finalActs,
            score: updateScore
          });
        })
        .catch(err => console.log("Error while click on `Act Now`", err));
    }
  };

  // getAllSuggestedActs = () => {
  // console.log("MOREEEEEEE");
  // return (
  // <h2>MORE</h2>
  // <div>
  //   {this.state.treatedSuggestedActs
  //     .filter((singledSuggestedAct, i) => i > 4)
  //     .map((singledSuggestedAct, i) => {
  //       return (
  //         <div>
  //           <h4>
  //             <b>{singledSuggestedAct.title}</b> {singledSuggestedAct.value}
  //           </h4>
  //           <p>{singledSuggestedAct.category}</p>
  //           <button>Act Now!</button>
  //         </div>
  //       );
  //     })}
  //   <button onClick={this.getAllSuggestedActs}>Hide</button>
  // </div>
  //   );
  // };

  handleViewDetails = () => {
    this.setState({
      detailsUnfolded: true
    });
    return (
      <div>
        <p>Completed acts:</p>
        {this.props.currentUser.completedActs.map((singleAction, i) => {
          return (
            <div key={i}>
              <p>
                {singleAction}
                {singleAction.title} {singleAction.value}
                {singleAction.category}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  toggleForm = () => {
    this.setState({ detailsUnfolded: !this.state.detailsUnfolded });
  };

  // const actionsThatMatchedCategory = this.state.arrayOfActions.filter(
  //   action => action.category === this.state.currentCategory._id
  // );

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
    console.log(
      "Dashboard suggested acts:",
      this.props.currentUser.suggestedActs
    );
    if (this.props.currentUser !== null) {
      // console.log(">>>>>>>>>>>>>>>>>>", this.state.treatedSuggestedActs);
      // console.log("PROPS IN:", this.props);
      // console.log("User:", this.props.currentUser);

      return (
        <section className="hero is-medium">
          <div className="hero-body">
            <div className="block">
              <p className="subtitle is-1">
                Hi there, {this.props.currentUser.fullName}
              </p>
            </div>
            <div className="columns">
              <div className="column">
                <Profile />
              </div>
              <div className="column">
                <h4 className="impactTitle title is-4">
                  Your Score is: {this.props.currentUser.score}
                </h4>
                {!this.state.detailsUnfolded &&
                  this.props.currentUser.score < 0 && (
                    <button onClick={this.toggleForm}>View Details</button>
                  )}
                {this.state.detailsUnfolded && (
                  <div>
                    <p>Completed acts:</p>
                    {this.props.currentUser.suggestedActs.map(singleAction => {
                      return (
                        <div>
                          <div key={singleAction._id}>
                            <b>{singleAction.title}</b> {singleAction.value}
                          </div>
                        </div>
                      );
                    })}
                    <button onClick={this.toggleForm}>Show Less</button>
                  </div>
                )}
                <p>________________________________</p>
                <p>Suggested Acts:</p>
                {this.props.currentUser.suggestedActs.map(singleAct => {
                  return (
                    <div>
                      <div key={singleAct._id}>
                        {singleAct.title}
                        <br />
                        {singleAct.value}
                        <br />
                        {singleAct.category.title}
                        <p>____________</p>
                        <br />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <p>________________MODAL________________</p>
            <button
              onClick={this.showModal}
              className="button is-large is-primary"
              id="displayModal"
            >
              Open Modal
            </button>

            <div className="modal" id="modal">
              <div className="modal-background"></div>
              <div className="modal-content">
                <div className="section formModal">
                  <form onSubmit={this.addNewActToDb}>
                    <p className="title is-4">Add New Action</p>

                    <div className="field">
                      <p className="control">
                        <input
                          className="input"
                          type="text"
                          name="titleAct"
                          placeholder="Name new action"
                          value={this.state.titleAct}
                          onChange={this.handleChange}
                        />
                      </p>
                    </div>

                    <div className="field">
                      <p className="control">
                        <input
                          className="input"
                          type="text"
                          name="descriptionAct"
                          placeholder="Describe new action"
                          value={this.state.descriptionAct}
                          onChange={this.handleChange}
                        />
                      </p>
                    </div>

                    <div className="field">
                      <p className="control">
                        <input
                          className="input"
                          type="number"
                          name="valueOfAct"
                          placeholder="How many points its worth?"
                          min="0"
                          value={this.state.valueOfAct}
                          onChange={this.handleChange}
                        />
                      </p>
                    </div>

                    <div className="field">
                      <p className="control">
                        <span className="select  is-fullwidth">
                          <select
                            name="actCategory"
                            onChange={this.handleChange}
                          >
                            <option className="option" value="">
                              Pick category
                            </option>
                            {this.props.categoriesFromBackEnd.map(
                              oneCategory => {
                                return (
                                  <option
                                    // value={oneCategory._id}
                                    value={oneCategory._id}
                                    key={oneCategory._id}
                                  >
                                    {oneCategory.title}
                                  </option>
                                );
                              }
                            )}
                          </select>
                        </span>
                      </p>
                    </div>

                    <div className="block">
                      <p className>
                        <button className="button">Submit</button>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
              <button
                onClick={this.closeModal}
                className="modal-close is-large"
                aria-label="close"
              ></button>
            </div>
          </div>
        </section>
      );
    } else {
      return "Loading...";
    }
  }
}

export default Dashbord;
