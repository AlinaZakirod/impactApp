import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class CategoryDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actionsFromBackEnd: null
    };
  }

  componentDidMount = () => {
    console.log(
      "====== props ======== ",
      this.props,
      this.props.location.state.theId
    );

    axios
      .get("http://localhost:3001/acts")
      .then(responseActions => {
        console.log("Response is: ", responseActions.data);
        this.setState({
          actionsFromBackEnd: responseActions.data
        });
      })
      .catch(err => console.log("Err while getting actions: ", err));
  };

  displayActions() {
    console.log(this.state.actionsFromBackEnd.allActs);
    // return this.state.actionsFromBackEnd.allActs.map((oneAct, i) => {
    // console.log("-------- ", oneAct);

    //   return (
    //     <div>
    //       <h1>{oneAct.title}</h1>
    //       <a href="/category/{{oneAct._id}}" key={i}>
    //         <p key={i}>{oneAct.title}</p>
    //       </a>
    //     </div>
    //   );
    // });

    // return (
    //   <div>
    //     <h1>{oneAct.title} action:</h1>
    //     <Link
    //       to={{
    //         pathname: `/act/${oneAct._id}`,
    //         state: {
    //           theId: oneAct._id,
    //           details: oneAct
    //         }
    //       }}
    //       key={i}
    //     >
    //       <p key={i}>{oneAct.title}</p>
    //     </Link>
    //   </div>
    // );
    return (
      <div>
        <h2>{this.props.location.state.details.title}</h2>
        <h4>{this.props.location.state.details.descrption}</h4>

        {/* {this.props.location.state.details.acts.map(oneD => {
          return <div>
            // <Link
            // key={i}
            // to={{
            //   pathname: `/category/${oneCat._id}`,
            //   state: {
            //     theId: oneCat._id
            //   }
            // }}
          </div>;
        })} */}
      </div>
    );
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h2>Category Details:{this.props.title}</h2>
        {this.state.actionsFromBackEnd && this.displayActions()}
      </div>
    );
  }
}
