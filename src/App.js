import React from "react";
// import logo from './logo.svg';
import "./App.css";

import axios from "axios";

import { Switch, Route, NavLink } from "react-router-dom";

import Signup from "./components/user-pages/Signup";
import Login from "./components/user-pages/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CategoryList from "./components/category-components/CategoryList";
import CategoryDetails from "./components/category-components/CategoryDetails";
import Dashboard from "./components/user-pages/Dashboard";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      categoriesFromBackEnd: null,
      actionsFromBackEnd: null
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_IMPACT_SERVER}/api/checkuser`, {
        withCredentials: true
      })
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

    this.getAllCategories();
    this.getAllActions();
  }

  getAllCategories = () => {
    axios
      .get(`${process.env.REACT_APP_IMPACT_SERVER}/category/allCats`)
      .then(responseCategories => {
        console.log(
          "Categories from DB: ",
          responseCategories.data.allCategories
        );
        this.setState({
          categoriesFromBackEnd: responseCategories.data.allCategories
        });
      })
      .catch(err => console.log("Err while getting categories: ", err));
  };

  getAllActions = () => {
    axios
      .get(`${process.env.REACT_APP_IMPACT_SERVER}/acts`)
      .then(responseActions => {
        console.log("Actions are: ", responseActions.data);
        this.setState({
          actionsFromBackEnd: responseActions.data
        });
      })
      .catch(err => console.log("Err while getting actions: ", err));
  };

  syncCurrentUSer(user) {
    this.setState({ currentUser: user });
  }

  logout = () => {
    this.setState({ currentUser: null });
    axios
      .delete(`${process.env.REACT_APP_IMPACT_SERVER}/api/logout`, {
        withCredentials: true
      })
      .then(() => {
        this.props.history.push("/");
      })
      .catch(err => console.log("error while logging out ", err));
  };

  // deleteCategory = indexN => {
  //   if (this.state.categoriesFromBackEnd !== null) {
  //     const theId = this.props.location.state.details._id;
  //     console.log("The id: ", theId);
  //     console.log(this.props);
  //     axios
  //       .post(`${process.env.REACT_APP_IMPACT_SERVER}/category/${theId}/delete`)
  //       .then(response => {
  //         console.log(
  //           "reached the push",
  //           response,
  //           " === ",
  //           this.state,
  //           "------------ ",
  //           this.props
  //         );
  //         const newCategories = this.state.categoriesFromBackEnd.filter(
  //           category => category._id !== this.state.currentCategory._id
  //         );
  //         // this.setState({
  //         //   categoriesFromBackEnd: newCategories
  //         // });
  //         this.props.history.push("/login");
  //       })
  //       .catch(err => console.log("Error while deleteing the category ", err));
  //   } else return "loading";
  // };

  render() {
    // console.log("the state in APPJS: ", this.state);
    console.log("++++++++++++++", this.state.categoriesFromBackEnd);
    // console.log("########", this.state.currentUser);
    return (
      <div>
        <header>
          <Navbar theUser={this.state.currentUser} doLogout={this.logout} />
        </header>
        <Switch>
          {/* this is example how we would render component normally */}
          {/* <Route exact path="/somePage" component={ someComponentThatWillRenderWhenThisRouteIsHit }   /> */}
          {/* <Route exact path="/" component={Home} />
          <Route exact path="/act/add" component={addAct} /> */}

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
            render={props => (
              <Login
                {...props}
                currentUser={this.state.currentUser}
                onUserChange={userDoc => this.syncCurrentUSer(userDoc)}
              />
            )}
          />

          {/* <Route path="/category" component={ActionList} /> */}

          {/* it was the way Marcos showed me */}
          {/* <Route
            exact
            path="/category"
            render={props => <CategoryList {...props} />}
          />

          <Route
            path="/category/:id"
            render={props => <CategoryDetails {...props} />}
          /> */}

          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                getAllCategories={this.getAllCategories}
                currentUser={this.state.currentUser}
                categoriesFromBackEnd={this.state.categoriesFromBackEnd}
                actionsFromBackEnd={this.state.actionsFromBackEnd}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={props => (
              <CategoryList
                {...props}
                currentUser={this.state.currentUser}
                categoriesFromBackEnd={this.state.categoriesFromBackEnd}
                actionsFromBackEnd={this.state.actionsFromBackEnd}
              />
            )}
          />

          <Route
            path="/category/"
            render={props => (
              <CategoryDetails
                {...props}
                getAllActions={this.getAllActions}
                currentUser={this.state.currentUser}
                categoriesFromBackEnd={this.state.categoriesFromBackEnd}
                actionsFromBackEnd={this.state.actionsFromBackEnd}
              />
            )}
          />

          <Route
            exact
            path="/dashboard"
            render={props => (
              <Dashboard
                {...props}
                getAllActions={this.getAllActions}
                currentUser={this.state.currentUser}
                categoriesFromBackEnd={this.state.categoriesFromBackEnd}
                actionsFromBackEnd={this.state.actionsFromBackEnd}
                currentUser={this.state.currentUser}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
