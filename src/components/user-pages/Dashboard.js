import React from "react";
import { Link } from "react-router-dom";

class Dashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treatedSuggestedActs: null,
      detailsUnfolded: false,
      // completedActs: this.props.completedActs,
      suggestedActs: this.props.currentUser.suggestedActs
    };
  }

  componentDidMount() {
    const userSuggestedActs = [];
    // console.log("1.-=-=-=-=-=", this.state.suggestedActs[1]);
    // console.log("2.-=-=-=-=-=", this.props.actionsFromBackEnd.allActs[1]._id);
    for (let i = 0; i < this.state.suggestedActs.length; i++) {
      for (let y = 0; y < this.props.actionsFromBackEnd.allActs.length; y++) {
        if (
          this.props.actionsFromBackEnd.allActs[y]._id ===
          this.state.suggestedActs[i]
        ) {
          userSuggestedActs.unshift(this.props.actionsFromBackEnd.allActs[y]);
          console.log("3.-=-=-=-=-=", userSuggestedActs);
        }
      }
    }
    console.log("****", userSuggestedActs);

    this.setState(
      {
        treatedSuggestedActs: userSuggestedActs
      },
      () => console.log("####", this.state.treatedSuggestedActs)
    );
  }

  getSuggestedActs = async () => {
    await this.actTreatment();
    console.log("All", this.state.treatedSuggestedActs);
    if (this.state.treatedSuggestedActs !== null) {
      const fourActs = this.state.treatedSuggestedActs.slice(0, 4);
      console.log("4:", fourActs);
      return fourActs.map(singledSuggestedAct => {
        return (
          <div>
            <p>
              {singledSuggestedAct.title} {singledSuggestedAct.value}
            </p>
            <button>Act Now!</button>
            {/* or use Link instead */}
          </div>
        );
      });
    }
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
          {this.getSuggestedActs}
        </div>
      );
    } else {
      return "Loading...";
    }
  }
}

export default Dashbord;
