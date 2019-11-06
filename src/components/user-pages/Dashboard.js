import React from "react";
import { Link } from "react-router-dom";

class Dashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsUnfolded: false,
      // completedActs: this.props.completedActs,
      suggestedActs: this.props.currentUser.suggestedActs,
      treatedSuggestedActs: null
    };
  }

  // actTreatment = act => {
  //   let treatedSuggestedActs;
  //   for (let i = 0; i < this.state.suggestedActs.length; i++) {
  //     if (act === this.suggestedActs[i]) {
  //       treatedSuggestedActs.push(act);
  //     }
  //   }

  //   this.setState({
  //     treatedSuggestedActs: treatedSuggestedActs
  //   });
  // };

  getSuggestedActs = () => {
    console.log("All", this.props.currentUser.suggestedActs);
    const twelveActs = this.props.currentUser.suggestedActs.slice(0, 4);
    console.log("12", twelveActs);
    return twelveActs.map(singledSuggestedAct => {
      return (
        <div>
          <p>{singledSuggestedAct}</p>
          <button>Act Now!</button>
          {/* or use Link instead */}
        </div>
      );
    });
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
      console.log(">>>>>>>>>>>>>>>>>>", this.props.currentUser);
      return (
        <div>
          <h2>{this.props.currentUser.fullName}</h2>
          <h4>Your score is {this.props.currentUser.score}</h4>
          {!this.state.detailsUnfolded && (
            <button onClick={this.toggleForm}>View Details</button>
          )}

          {this.state.detailsUnfolded && (
            <div>
              <div>
                <p>Completed acts:</p>
                {this.props.currentUser.completedActs.map((singleAction, i) => {
                  return (
                    <div>
                      <div key={i}>
                        <p>
                          {singleAction}
                          {singleAction.title} {singleAction.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button onClick={this.toggleForm}>Show Less</button>
            </div>
          )}

          <p>________________________________</p>
          {this.getSuggestedActs()}
        </div>
      );
    } else {
      return "Loading...";
    }
  }
}

export default Dashbord;
