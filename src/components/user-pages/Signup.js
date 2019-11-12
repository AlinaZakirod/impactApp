import React from "react";
import axios from "axios";
// import signupBg from '../../../build/landing-page.jpg"';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
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
        `${process.env.REACT_APP_IMPACT_SERVER}/api/signup`,
        // the data from the form (AKA req.body) that we are sending to this route to do the job
        this.state,
        // secure sending
        { withCredentials: true }
      )
      .then(responseFromServer => {
        const { updatedUserSuggestedActs } = responseFromServer.data;
        this.props.onUserChange(updatedUserSuggestedActs);
        this.props.history.push("/");
        // this.reload();
        // history.push("/");
      })
      .catch(err => {
        if (err.response.data)
          return this.setState({ message: err.response.data.message });
      });
  }

  render() {
    console.log("Do I have user in Signup: ", this.props.currentUser);
    console.log(" what is this >>>>>> ", this);
    const { fullName, email, password } = this.state;
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
      <section
        className="hero is-success  is-fullheight has-bg-img"
        // src={signupBg}
      >
        <div className="hero-body">
          {/* <div class="columns"> */}
          <div className="column is-one-fifth"></div>
          <div className="column is-one-third has-text-left">
            <h2 className="title is-1">Sign up </h2>
            <form
              onSubmit={event => {
                this.handleSubmit(event);
              }}
            >
              <div className="control">
                <label className="label"> Full name: </label>
                <input
                  className="input"
                  value={fullName} // this.state.fullName
                  onChange={event => this.genericSync(event)}
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                />
              </div>

              <div className="control">
                <label className="label"> Email: </label>
                <input
                  className="input"
                  value={email} // this.state.email
                  onChange={event => this.genericSync(event)}
                  type="email"
                  name="email"
                  placeholder="my-email@email.com"
                />
              </div>

              <div className="control">
                <label className="label"> Password</label>
                <input
                  className="input"
                  value={password} // this.state.password
                  onChange={event => this.genericSync(event)}
                  type="password"
                  name="password"
                  placeholder="***********"
                />
              </div>

              <button className="button"> Sign Up </button>

              <div>
                <p>Already have an account?</p>
                <button>Login</button>
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
