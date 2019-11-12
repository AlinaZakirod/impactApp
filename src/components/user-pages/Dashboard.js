import React from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
// import { handleChangeAct } from "../category-components/CategoryDetails";

class Dashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treatedSuggestedActs: null,
      detailsUnfolded: false,
      // completedActs: this.props.completedActs,
      suggestedActs: this.props.currentUser.suggestedActs.slice(0, 4),
      score: this.props.currentUser.score,
      categoriesFromBackEnd: this.props.categoriesFromBackEnd
    };
  }

  componentDidMount() {
    let userSuggestedActs = [];
    // console.log("1.-=-=-=-=-=", this.state.suggestedActs[1]);
    // console.log("2.-=-=-=-=-=", this.props.actionsFromBackEnd.allActs[1]._id);
    for (let i = 0; i < this.props.currentUser.suggestedActs.length; i++) {
      for (let y = 0; y < this.props.actionsFromBackEnd.allActs.length; y++) {
        if (
          this.props.actionsFromBackEnd.allActs[y]._id ===
          this.props.currentUser.suggestedActs[i]
        ) {
          userSuggestedActs.unshift(this.props.actionsFromBackEnd.allActs[y]);
          // console.log("3.-=-=-=-=-=", userSuggestedActs);
        }
      }
    }
    console.log("****", userSuggestedActs);
    for (let i = 0; i < userSuggestedActs.length; i++) {
      for (let y = 0; y < this.state.categoriesFromBackEnd.length; y++) {
        if (
          userSuggestedActs[i].category ===
          this.state.categoriesFromBackEnd[y]._id
        ) {
          console.log("BLA-BLA-BLA");
          console.log("Title is :", this.state.categoriesFromBackEnd[y].title);
        }
      }
    }
    console.log("+++++", userSuggestedActs);

    console.log("Category Name?: ", userSuggestedActs);

    this.setState(
      {
        treatedSuggestedActs: userSuggestedActs
      },
      () => console.log("####", this.state.treatedSuggestedActs)
    );
  }

  getLessSuggestedActs = () => {
    // this.actTreatment();
    console.log("All", this.state.treatedSuggestedActs);
    if (this.state.treatedSuggestedActs !== null) {
      // const fourActs = this.state.treatedSuggestedActs.slice(0, 4);
      // console.log("4:", fourActs);

      console.log("cut suggested acts:", this.state.treatedSuggestedActs);

      return (
        <div>
          <p>Suggested Acts:</p>
          {this.state.treatedSuggestedActs
            .filter((singledSuggestedAct, i) => i < 5)
            .map((singledSuggestedAct, i) => {
              return (
                <div>
                  <h4>
                    <b>{singledSuggestedAct.title}</b>{" "}
                  </h4>
                  <p>{singledSuggestedAct.value}</p>

                  <p>{singledSuggestedAct.description}</p>
                  <button
                    onClick={e => {
                      this.handleChangeAct(singledSuggestedAct._id);
                    }}
                  >
                    Act Now!
                  </button>
                </div>
              );
            })}
          <button onClick={this.getAllSuggestedActs}>
            View All suggested Acts
          </button>
        </div>
      );
    }
  };

  handleChangeAct = actId => {
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

  getAllSuggestedActs = () => {
    console.log("MOREEEEEEE");
    return (
      <h2>MORE</h2>
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
    );
  };

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

  render() {
    if (this.props.currentUser !== null) {
      console.log(">>>>>>>>>>>>>>>>>>", this.state.treatedSuggestedActs);
      console.log("Categories:", this.state.categoriesFromBackEnd);

      return (
        <div>
          <h2>Hi there, {this.props.currentUser.fullName}</h2>
          <h4>Your score is {this.state.score}</h4>
          {!this.state.detailsUnfolded && (
            <button onClick={this.toggleForm}>View Details</button>
          )}

          {this.state.detailsUnfolded && (
            <div>
              <p>Completed acts:</p>
              {this.state.treatedSuggestedActs.map((singleAction, i) => {
                return (
                  <div>
                    <div key={i}>
                      <b>{singleAction.title}</b> {singleAction.value}
                    </div>
                  </div>
                );
              })}
              <button onClick={this.toggleForm}>Show Less</button>
            </div>
          )}

          <p>________________________________</p>
          {this.getLessSuggestedActs()}
        </div>
      );
    } else {
      return "Loading...";
    }
  }
}

export default Dashbord;
