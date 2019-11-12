import React from "react";
import "./App.css";
import "bulma/css/bulma.css";
import "bulma-helpers/css/bulma-helpers.min.css";
import history from "./history";
import axios from "axios";

import { Switch, Route, NavLink } from "react-router-dom";

import Signup from "./components/user-pages/Signup";
import Login from "./components/user-pages/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CategoryList from "./components/category-components/CategoryList";
import CategoryDetails from "./components/category-components/CategoryDetails";
import Dashboard from "./components/user-pages/Dashboard";
import Profile from "./components/user-pages/Profile";

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

    // setTimeout(() => {
    //   this.setState({
    //     ready: true
    //   });
    // }, 1000);
  }

  syncCurrentUSer(user) {
    console.log("current usre info ---- ", user);
    this.setState({ currentUser: user });
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

  editCategory = oneCat => {
    console.log("!Do i have cat here: ", oneCat);
  };

  deleteCategory = oneCat => {
    // console.log("do i have cat here: ", oneCat.author);
    // console.log("Current user: ", this.state.currentUser._id);
    // && this.state.currentUser._id === oneCat.author
    if (oneCat !== null) {
      const theId = oneCat._id;
      console.log("The id: ", theId);

      axios
        .post(`${process.env.REACT_APP_IMPACT_SERVER}/category/${theId}/delete`)
        .then(response => {
          const newCategories = this.state.categoriesFromBackEnd.filter(
            category => category._id !== oneCat._id
          );
          this.setState({
            categoriesFromBackEnd: newCategories
          });
          console.log("helllooooo: =-=-=-=-=-=-=-=-=-= ", history);
          history.push("/");
        })
        .catch(err => console.log("Error while deleteing the category ", err));
    } else return "loading";
  };

  render() {
    // console.log("the state in APPJS: ", this.state);
    // console.log("++++++++++++++", this.state.categoriesFromBackEnd);
    // console.log("########", this.state.currentUser);
    return (
      <div>
        <div className="">
          <header className="container">
            <Navbar
              theUser={this.state.currentUser}
              doLogout={this.logout}
              className="navbar is-fixed-top is-primary"
              role="navigation"
              aria-label="main navigation"
            />
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
              render={props => (
                <Signup
                  {...props}
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
                  getCategoryObjforDelete={catObj =>
                    this.deleteCategory(catObj)
                  }
                  getCategoryObjforEdit={catObj => this.editCategory(catObj)}
                  getAllActions={this.getAllActions}
                  getAllCategories={this.getAllCategories}
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
                />
              )}
            />
            <Route
              exact
              path="/profile"
              render={props => (
                <Profile
                  {...props}
                  currentUser={this.state.currentUser}
                  categoriesFromBackEnd={this.state.categoriesFromBackEnd}
                  actionsFromBackEnd={this.state.actionsFromBackEnd}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
