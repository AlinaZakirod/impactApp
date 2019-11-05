import React from "react";
import { Link } from "react-router-dom";

class Dashbord extends React.Component {
  constructor(props) {
    super(props);
  }

  getSuggestedActs = () => {
    console.log("All", this.props.currentUser.suggestedActs);
    const twelveActs = this.props.currentUser.suggestedActs.slice(0, 12);
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

  render() {
    if (this.props.currentUser !== null) {
      console.log(this.props.currentUser.suggestedActs);
      return (
        <div>
          <h2>{this.props.currentUser.fullName}</h2>
          <h4>Your score is {this.props.currentUser.score}</h4>
          {this.getSuggestedActs()}
        </div>
      );
    } else {
      return "Loading...";
    }
  }
}

export default Dashbord;
