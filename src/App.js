import React from "react";
import "./App.css";

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
import NavExample from "./components/user-pages/NavbarExample";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      categoriesFromBackEnd: null,
      actionsFromBackEnd: null,
      suggestedActs: []
    };
  }

  componentDidMount() {
    this.getTheUser();
    this.getAllCategories();
    this.getAllActions();

    // setTimeout(() => {
    //   this.setState({
    //     ready: true
    //   });
    // }, 1000);
  }

  syncCurrentUSer(user) {
    console.log("USER:", user);
    this.setState({
      currentUser: user,
      suggestedActs: user.suggestedActs
    });
    console.log(
      "CURRENT USER`S ACTIONS in APP.js:",
      this.state.currentUser.suggestedActs
    );
  }
  getTheUser = () => {
    axios
      .get(`${process.env.REACT_APP_IMPACT_SERVER}/api/checkuser`, {
        withCredentials: true
      })
      .then(responseFromTheBackend => {
        console.log("User in APP.JS: ", responseFromTheBackend.data);
        const { userDoc } = responseFromTheBackend.data;
        this.syncCurrentUSer(userDoc);
      })
      .catch(err =>
        console.log(
          "Err while getting the user from the checkuser route: ",
          err
        )
      );
  };

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

  handleActNow = act => {
    if (this.state.suggestedActs !== null) {
      console.log("ACT ID FROM CATEGORY DETAILS IS :", act._id);
      console.log("CurrentUser IN APP.JS", this.state.currentUser);
      console.log("CurrentUser score IN APP.JS", this.state.currentUser.score);
      const userFinalActs = this.state.suggestedActs.filter(
        action => action._id !== act._id
      );
      console.log("FINAL ACTS for user ARE: ", userFinalActs);
      axios
        .post(
          `${process.env.REACT_APP_IMPACT_SERVER}/act/${act._id}/update`,
          {},
          {
            withCredentials: true
          }
        )
        .then(() => {
          // make some success message here!
          this.state.currentUser.score += act.value;
          console.log("Updated Score is: ", this.state.currentUser.score);
          this.setState({
            suggestedActs: userFinalActs
          });
        })
        .catch(err => console.log("Error while click on `Act Now`", err));
    } else return "there are no more Actions left! let'c make a new one";
  };

  editCategory = (oneCat, updated) => {
    console.log(">>>>>>>>>Do i have cat here: ", oneCat);
    console.log("<<<<<<<<<Updated info: ", updated);
    if (oneCat !== null) {
      const theId = oneCat._id;
      const updatedCategory = updated;
      axios
        .post(
          `${process.env.REACT_APP_IMPACT_SERVER}/category/${theId}/update`,
          updatedCategory
        )

        .then(updatedCategory => {
          this.getAllCategories();

          // this.setState({
          //   categoriesFromBackEnd: updatedCategoryList
          // });
        })
        .catch(err => console.log("Error while editing the Category ", err));
    }
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
    console.log("APP.JS |  USER", this.state.currentUser);
    return (
      <div>
        <div className="">
          <header className="container">
            {/* <NavExample /> */}
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
                  suggestedActs={this.state.suggestedActs}
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
                  blah="blah"
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
                  getActIdforActNow={act => this.handleActNow(act)}
                  getCategoryObjforDelete={catObj =>
                    this.deleteCategory(catObj)
                  }
                  getCategoryObjforEdit={(catObj, category) =>
                    this.editCategory(catObj, category)
                  }
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
                  getActIdforActNow={act => this.handleActNow(act)}
                  getTheUser={this.getTheUser}
                  getAllActions={this.getAllActions}
                  currentUser={this.state.currentUser}
                  suggestedActs={this.state.suggestedActs}
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
