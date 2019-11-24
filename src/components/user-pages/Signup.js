import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import signupBg from '../../../build/landing-page.jpg"';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      message: null,
      suggestedActs: ""
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
        `${process.env.REACT_APP_IMPACT_SERVER}/api/signup`,
        // the data from the form (AKA req.body) that we are sending to this route to do the job
        this.state,
        // secure sending
        { withCredentials: true }
      )
      .then(responseFromServer => {
        console.log("is this working?????", responseFromServer);
        const { populatedUser } = responseFromServer.data;
        this.props.onUserChange(populatedUser);
        console.log("SIGNUP|POPULATED USER:", populatedUser);

        this.props.history.push("/");
      })
      .catch(err => {
        if (err.response.data)
          return this.setState({ message: err.response.data.message });
      });
  }

  render() {
    console.log("Do I have user in Signup: ", this.props.currentUser);
    console.log(" what is this >>>>>> ", this);
    const { fullName, email, password, suggestedActs } = this.state;
    console.log("SIGNUP STATE:", this.state);
    console.log("SIGNUP PROPS:", this.props);

    // console.log("STATE: ", this.state);
    if (this.props.currentUser) {
      return (
        <div>
          <h2>
            Welcome to your app, {this.props.currentUser.fullName} ! You're
            signed in!{" "}
          </h2>
        </div>
      );
    }

    return (
      <section className="hero is-fullheight has-bg-img horizontalCenter">
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
                <label className="impactTitle h2Impact">Sign up</label>
                <div className="content"></div>
                <p className="control has-icons-left ">
                  <input
                    className="input is-medium"
                    value={fullName} // this.state.fullName
                    onChange={event => this.genericSync(event)}
                    type="text"
                    name="fullName"
                    placeholder="Your Name"
                  />

                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input is-medium"
                    value={email} // this.state.email
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
                  <button className="button impactButton">Sign Up</button>
                </p>
              </div>

              <div>
                <p className="subtitle is-5">
                  Already have an account?
                  <Link className="impactInlineButton" to="/login-page">
                    {" "}
                    Login
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
