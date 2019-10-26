import React from "react";
import axios from "axios";

export default class ActionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionsFromBackEnd: null
    };
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:3001/acts")
      .then(responseActions => {
        // console.log("Response is: ", responseActions.data);
        this.setState({
          actionsFromBackEnd: responseActions.data
        });
      })
      .catch(err => console.log("Err while getting actions: ", err));
  };

  displayActions() {
    // console.log(this.state.categoriesFromBackEnd);
    return this.state.actionsFromBackEnd.allActions.map((oneAct, i) => {
      return (
        <a href="/act/{{this._id}}" key={i}>
          <p key={i}>{oneAct.title}</p>
        </a>
      );
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1> Actions for {this.props._id}:</h1>
        <div>{this.state.actionsFromBackEnd && this.displayActions()}</div>
      </div>
    );
  }
}
