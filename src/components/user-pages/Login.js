import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: null
    };
  }

  genericSync(event) {
    // console.log("what is: ", event.target.value)
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    // console.log("submitting form");
    event.preventDefault();

    axios
      .post(
        // route we are hitting in the backend
        `${process.env.REACT_APP_IMPACT_SERVER}/api/login`,
        // the data from the form (AKA req.body 🚀) that we are sending to this route to do the job
        this.state,
        // secure sending
        { withCredentials: true }
      )
      .then(responseFromServer => {
        // console.log("response is:", responseFromServer);
        const { userDoc } = responseFromServer.data;
        this.props.onUserChange(userDoc);
        // console.log(this.props.match);
        this.props.history.push("/");
        // alert("You are logged in.");
      })
      .catch(err => {
        console.log("err: ", err.response);
        if (err.response.data)
          return this.setState({ message: err.response.data.message });
      });
  }

  render() {
    console.log("Do I have user in Login: ", this.props.currentUser);

    const { email, password } = this.state;

    return (
      // <section>
      //   <h2> Login </h2>
      //   <form onSubmit={event => this.handleSubmit(event)}>
      //     <label> Email: </label>
      //     <input
      //       value={email} // this.state.email
      //       onChange={event => this.genericSync(event)}
      //       type="email"
      //       name="email"
      //       placeholder="my-email@ironhack.com"
      //     />

      //     <label> Password</label>
      //     <input
      //       value={password} // this.state.password
      //       onChange={event => this.genericSync(event)}
      //       type="password"
      //       name="password"
      //       placeholder="***********"
      //     />
      //     <button> Login </button>
      //   </form>
      //   {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
      //   {this.state.message && <div> {this.state.message} </div>}
      // </section>

      <section
        className="hero is-fullheight has-bg-img  horizontalCenter "
        // style={{ marginBottom: 500 }}
      >
        <div className="hero-body">
          {/* <div class="columns"> */}
          <div className="column is-one-fifth"></div>
          <div className="column is-one-quarter has-text-left">
            <form
              onSubmit={event => {
                this.handleSubmit(event);
              }}
            >
              <div className="field">
                <label className="label is-large is-1">Login</label>
                <p className="control has-icons-left ">
                  <input
                    className="input is-medium"
                    value={email}
                    onChange={event => this.genericSync(event)}
                    type="email"
                    name="email"
                    placeholder="Email@ironhack.com"
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-envelope"></i>
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    value={password} // this.state.password
                    onChange={event => this.genericSync(event)}
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control">
                  <button className="button">Login</button>
                </p>
              </div>

              <div>
                <p>
                  Don't have an account?{" "}
                  <Link className="impactInlineButton" to="/signup-page">
                    Signup
                  </Link>
                </p>
              </div>
            </form>
            {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}
          </div>
          {this.state.message && <div> {this.state.message} </div>}
          {/* </div> */}
        </div>
      </section>
    );
  }
}
