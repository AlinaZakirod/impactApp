import React from "react";
// import logo from './logo.svg';
import "./App.css";

import axios from "axios";

import { Switch, Route, NavLink } from "react-router-dom";

import Signup from "./components/user-pages/Signup";
import Login from "./components/user-pages/Login";

import CountriesList from "./components/CountriesList";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/checkuser", { withCredentials: true })
      .then(responseFromTheBackend => {
        // console.log("User in APP.JS: ", responseFromTheBackend)
        const { userDoc } = responseFromTheBackend.data;
        this.syncCurrentUSer(userDoc);
      })
      .catch(err =>
        console.log(
          "Err while getting the user from the checkuser route: ",
          err
        )
      );
  }

  syncCurrentUSer(user) {
    this.setState({ currentUser: user });
  }

  logout = () => {
    this.setState({ currentUser: null });
  };

  render() {
    // console.log("the state in APPJS: ", this.state);
    return (
      <div>
        <header>
          {/* Sandra's way to do the nav */}
          {/* <nav>
            <NavLink to="/"> Home </NavLink>
            <NavLink to="/signup-page"> Signup </NavLink>
            <NavLink to="/login-page"> Login </NavLink>
            <NavLink to=""> Logout </NavLink>
            <NavLink to="/countries"> Countries </NavLink>
          </nav> */}

          <Navbar theUser={this.state.currentUser} doLogout={this.logout} />
        </header>
        <Switch>
          {/* this is example how we would render component normally */}
          {/* <Route exact path="/somePage" component={ someComponentThatWillRenderWhenThisRouteIsHit }   /> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/countries" component={CountriesList} />

          {/* if we have to pass some props down to a component,
          we can't use a standard way of rendering using component={},
          but instead we have to use render = {}  like in the example below */}
          <Route
            exact
            path="/signup-page"
            render={() => (
              <Signup
                currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUSer(userDoc)}
              />
            )}
          />

          <Route
            exact
            path="/login-page"
            render={() => (
              <Login
                currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUSer(userDoc)}
              />
            )}
          />
        </Switch>
        {/* <CountriesList /> */}
      </div>
    );
  }
}

export default App;
