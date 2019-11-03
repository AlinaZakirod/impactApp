import React from "react";
import axios from "axios";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddActForm: false,
      titleAct: "",
      descriptionAct: "",
      valueOfAct: "",
      actCategory: ""
    };
  }

  handleChangeAct = actId => {
    const currentCategory = this.props.location.state.details;
    const arrayOfActions = this.props.actionsFromBackEnd;
    const actionsThatMatchedCategory = arrayOfActions.allActs.filter(
      action => action.category == currentCategory._id
    );

    console.log(`${process.env.REACT_APP_IMPACT_SERVER}/act/${actId}/update`);
    axios
      .post(
        `${process.env.REACT_APP_IMPACT_SERVER}/act/${actId}/update`,
        {},
        {
          withCredentials: true
        }
      )

      .then(
        actId => actionsThatMatchedCategory.slice(0, 2),
        console.log(actionsThatMatchedCategory)
      )

      .catch(err => console.log("Error while click on `Act Now`", err));
  };

  showCategoryDetails = () => {
    const currentCategory = this.props.location.state.details;
    const arrayOfActions = this.props.actionsFromBackEnd;
    const actionsThatMatchedCategory = arrayOfActions.allActs.filter(
      action => action.category == currentCategory._id
    );
    if (this.props.categoriesFromBackEnd !== null) {
      console.log("Current category: ", this.props.location.state.details);

      console.log("^^^^^^^^", currentCategory);
      console.log("********", arrayOfActions);
      return (
        <div>
          <h2>{currentCategory.title}</h2>
          <p>{currentCategory.description}</p>
          <b>Actions:</b>
          {actionsThatMatchedCategory.map((singleAction, i) => {
            console.log(singleAction);
            return (
              <div key={i}>
                <p>{singleAction.title}</p>
                <button
                  onClick={e => {
                    this.handleChangeAct(singleAction._id);
                  }}
                >
                  Act now!
                </button>
              </div>
            );
          })}
        </div>
      );
    } else return "loading";
  };

  deleteCategory = () => {
    if (this.props.categoriesFromBackEnd !== null) {
      const theId = this.props.location.state.details._id;
      console.log("The id: ", theId);
      console.log(this.props);
      axios
        .post(`${process.env.REACT_APP_IMPACT_SERVER}/category/${theId}/delete`)
        .then(() => {
          this.props.history.push("/");
        })
        .catch(err => console.log("Error while deleteing the category ", err));
    } else return "loading";
  };

  // function for "Add Action"
  toggleForm = () => {
    this.setState({ showAddActForm: !this.state.showAddActForm });
  };

  handleChange = e => {
    console.log("changing value", e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewActToDb = e => {
    e.preventDefault();
    console.log("#####", this.state);
    const newAct = {
      title: this.state.titleAct,
      description: this.state.descriptionAct,
      value: this.state.valueOfAct,
      category: this.state.actCategory
    };

    axios
      .post(`${process.env.REACT_APP_IMPACT_SERVER}/act/create`, newAct)
      .then(newAct => {
        this.props.history.push("/");
      })
      .catch(err => console.log("Error while adding the new Act ", err));
  };

  //end of functions for 'Add Actions'

  render() {
    if (this.props.categoriesFromBackEnd !== null) {
      return (
        <div>
          {/* <p>Category: {this.props.location.state.details.title}</p> */}
          {this.showCategoryDetails()}
          <div>
            {/* start of Add Action */}
            <div>
              {!this.state.showAddActForm && (
                <button onClick={this.toggleForm}>Add New Action</button>
              )}

              {this.state.showAddActForm && (
                <form onSubmit={this.addNewActToDb}>
                  <h3>Add New Action</h3>
                  <p>Title</p>
                  <input
                    name="titleAct"
                    type="text"
                    value={this.state.titleAct}
                    onChange={this.handleChange}
                  />
                  <p>Description</p>
                  <input
                    name="descriptionAct"
                    type="text"
                    value={this.state.descriptionAct}
                    onChange={this.handleChange}
                  />

                  <p>Value: </p>
                  <input
                    name="valueOfAct"
                    type="number"
                    min="0"
                    value={this.state.valueOfAct}
                    onChange={this.handleChange}
                  />

                  <p>Select Category</p>
                  <select name="actCategory" onChange={this.handleChange}>
                    <option value="">Pick category</option>
                    {this.props.categoriesFromBackEnd.map(oneCategory => {
                      return (
                        <option
                          // value={oneCategory._id}
                          value={oneCategory._id}
                          key={oneCategory._id}
                        >
                          {oneCategory.title}
                        </option>
                      );
                    })}
                  </select>

                  <button>Submit</button>
                </form>
              )}
            </div>
            {/* end of Add action */}
            <p>_________________________</p>
            <button>Edit Category</button>
            <button onClick={this.deleteCategory}>Delete Category</button>
          </div>
        </div>
      );
    } else {
      return "Loading...";
    }
  }
}

//WITHOUT PARAMETERS
{
  /* <button onClick={this.function}></button> */
}

//WITH PARAMETERS
{
  /* <button onClick={e => this.function(parameterGoesHere)}></button> */
}
