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
      actCategory: "",
      currentCategory: this.props.location.state.details,
      arrayOfActions: this.props.actionsFromBackEnd.allActs,
      categoriesFromBackEnd: this.props.categoriesFromBackEnd,
      showEditCategoryForm: false,
      // titleCat: this.props.location.state.details.title,
      // descriptionCat: this.props.location.state.details.description
      titleCat: "",
      descriptionCat: ""
    };
  }

  handleChangeAct = actId => {
    // const currentCategory = this.props.location.state.details;
    // const arrayOfActions = this.props.actionsFromBackEnd;
    // console.log("0~~~~~~~~~", arrayOfActions);
    const actionsThatMatchedCategory = this.state.arrayOfActions.filter(
      action => action.category === this.state.currentCategory._id
    );

    // console.log("1~~~~~~~~~~~~~", actionsThatMatchedCategory);
    const finalActs = actionsThatMatchedCategory.filter(
      action => action._id !== actId
    );
    // console.log("2~~~~~~~~~~~~~", finalActs);

    // __________________________

    console.log(`${process.env.REACT_APP_IMPACT_SERVER}/act/${actId}/update`);
    axios
      .post(
        `${process.env.REACT_APP_IMPACT_SERVER}/act/${actId}/update`,
        {},
        {
          withCredentials: true
        }
      )

      .then(() => {
        // make some success message here!
        this.setState({
          arrayOfActions: finalActs
        });
      })

      .catch(err => console.log("Error while click on `Act Now`", err));
  };

  showCategoryDetails = () => {
    if (this.props.categoriesFromBackEnd !== null) {
      // const currentCategory = this.props.location.state.details;
      // const this.state.arrayOfActions = this.props.actionsFromBackEnd;
      const actionsThatMatchedCategory = this.state.arrayOfActions.filter(
        action => action.category == this.state.currentCategory._id
      );
      console.log("Current category: ", this.props.location.state.details);

      // console.log("^^^^^^^^", currentCategory);
      // console.log("********", arrayOfActions);
      return (
        <div>
          <h2>{this.state.currentCategory.title}</h2>
          <p>{this.state.currentCategory.description}</p>
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

  toggleForm = () => {
    this.setState({ showAddActForm: !this.state.showAddActForm });
  };

  toggleFormCategory = () => {
    this.setState({ showEditCategoryForm: !this.state.showEditCategoryForm });
  };

  handleChange = e => {
    console.log("changing value", e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewActToDb = e => {
    e.preventDefault();
    console.log("#####", this.state);
    let listOfActions = [...this.state.arrayOfActions];
    console.log("first", listOfActions);

    let newAct = {
      title: this.state.titleAct,
      description: this.state.descriptionAct,
      value: this.state.valueOfAct,
      category: this.state.actCategory,
      author: this.props.currentUser
    };

    listOfActions.unshift(newAct);

    this.setState({
      showAddActForm: false,
      titleAct: "",
      descriptionAct: "",
      valueOfAct: "",
      actCategory: "",
      arrayOfActions: listOfActions
    });

    console.log("second", listOfActions);
    axios
      .post(`${process.env.REACT_APP_IMPACT_SERVER}/act/create`, newAct)
      .then(newAct => {
        this.props.getAllActions();
      })
      .catch(err => console.log("Error while adding the new Act ", err));

    // this.props.getAllActions();
  };

  //end of functions for 'Add Actions'

  editCategoryInDb = e => {
    e.preventDefault();
    let listOfCategories = [...this.state.categoriesFromBackEnd];
    console.log("Cat first", listOfCategories);

    let updatedCategory = {
      title: this.state.titleCat,
      description: this.state.description
    };

    listOfCategories.unshift(updatedCategory);

    this.setState({
      showEditCategoryForm: false,
      titleCat: "",
      descriptionCat: ""
    });

    console.log("Cat second", listOfCategories);
    axios
      .post(
        `${process.env.REACT_APP_IMPACT_SERVER}category/${this.state.currentCategory._id}/update`,
        updatedCategory
      )
      .then(newAct => {
        this.props.getAllCategories();
      })
      .catch(err => console.log("Error while editing theCategory ", err));

    this.props.getAllCategories();
    // this.props.getAllActions();
  };

  render() {
    if (this.props.categoriesFromBackEnd !== null) {
      console.log("Current category", this.state.currentCategory.author);
      console.log("current User:", this.props.currentUser._id);

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
                    onChange={this.handleChnge}
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

            {/* <button
              onClick={() => {
                this.props.getCategoryObj(this.props.location.state.details);
              }}
            >
              Delete Category
            </button> */}

            <div>
              {this.state.currentCategory.author ===
                this.props.currentUser._id && (
                <div>
                  <div>
                    {!this.state.showEditCategoryForm && (
                      // <button
                      //   onClick={() => {
                      //     this.toggleFormCategory;
                      //     this.props.handleCategoryUpdate(
                      //       this.props.location.state.details
                      //     );
                      //   }}
                      // >
                      <button onClick={this.toggleFormCategory}>
                        Edit Category
                      </button>
                    )}
                    )}
                    {this.state.showEditCategoryForm && (
                      <form onSubmit={this.editCategoryInDb}>
                        <h3>Edit {this.state.currentCategory.title}</h3>
                        <p>Title</p>
                        <input
                          name="titleAct"
                          type="text"
                          placeholder={this.state.currentCategory.title}
                          value={this.state.titleAct}
                          onChange={this.handleChange}
                        />
                        <p>Description</p>
                        <textarea
                          name="descriptionAct"
                          type="text"
                          placeholder={this.state.currentCategory.description}
                          value={this.state.descriptionAct}
                          onChange={this.handleChange}
                        />
                        <button>Save Changes</button>
                      </form>
                    )}
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        this.props.getCategoryObjforDelete(
                          this.props.location.state.details
                        );
                      }}
                    >
                      Delete Category{" "}
                    </button>
                  </div>
                </div>
              )}
            </div>
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

// export { handleChangeAct };
