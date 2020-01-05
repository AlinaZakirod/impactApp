import React from "react";
import axios from "axios";
import history from "../../history";
import { toast } from "react-toastify";

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
      suggested: this.props.suggestedActs,
      // titleCat: this.props.location.state.details.title,
      // descriptionCat: this.props.location.state.details.description
      titleCat: "",
      descriptionCat: ""
    };
  }

  showCategoryDetails = () => {
    if (this.props.currentUser !== null) {
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
          <p className="title is-1">{this.state.currentCategory.title}</p>
          <p className="subtitle is-1">
            {this.state.currentCategory.description}
          </p>
          <div>
            <p className="title is-4">Actions:</p>
            <div className="columns  is-multiline is-8 is-variable is-centered">
              {actionsThatMatchedCategory.map((singleAction, i) => {
                console.log(singleAction);
                return (
                  <div className="column is-3">
                    <div className="card" key={i}>
                      <header className="card-header">
                        <p className="card-header-title">
                          {singleAction.title}
                        </p>
                        <p className="card-score">{singleAction.value}</p>
                      </header>
                      <div className="card-content">
                        <div className="content">
                          <p>{singleAction.description} </p>
                        </div>
                      </div>
                      <footer className="card-footer is-centered">
                        <button
                          className="button  is-fillwidth impactInlineButton"
                          onClick={e => {
                            this.props.getActIdforActNow(singleAction);
                          }}
                        >
                          Act now!
                        </button>
                      </footer>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return "loading";
    }
  };

  // toggleForm = () => {
  //   this.setState({ showAddActForm: !this.state.showAddActForm });
  // };

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

    let newAct = {
      title: this.state.titleAct,
      description: this.state.descriptionAct,
      value: this.state.valueOfAct,
      category: this.state.actCategory,
      author: this.props.currentUser
    };

    console.log("first", newAct.value);
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
    toast.success("New Action is successfully added!");
  };

  //end of functions for 'Add Actions'

  editCategoryInDb = e => {
    e.preventDefault();
    if (this.state.currentCategory !== null) {
      this.setState({
        [e.target.name]: e.target.value
      });

      let updatedCategory = {
        _id: this.state.currentCategory._id,
        title: this.state.titleCat,
        description: this.state.descriptionCat,
        author: this.state.currentCategory.author
      };

      const newListOfCategories = this.state.categoriesFromBackEnd.filter(
        category => category._id !== this.state.currentCategory._id
      );
      newListOfCategories.push(updatedCategory);

      this.setState({
        showEditCategoryForm: false,
        titleCat: "",
        descriptionCat: "",
        currentCategory: updatedCategory,
        categoriesFromBackEnd: newListOfCategories
      });
      console.log(">>>>", this.state);

      this.props.getCategoryObjforEdit(
        this.props.location.state.details,
        updatedCategory
      );
    } else {
      return "loading category...";
    }
  };

  showModal = () => {
    let displayModal = document.getElementById("displayModal");
    let modal = document.getElementById("modal");

    modal.style.display = "block";
    // this.setState({ showAddCategoryForm: !this.state.showAddCategoryForm });
  };

  closeModal = () => {
    let modal = document.getElementById("modal");
    let close = document.getElementsByClassName("modal-close")[0];
    modal.style.display = "none";
  };

  showModalCategory = () => {
    let displayModalCategory = document.getElementById("displayModalCategory");
    let modalCategory = document.getElementById("modalCategory");
    let close = document.getElementById("modal-close");

    modalCategory.style.display = "block";
    // this.setState({ showAddCategoryForm: !this.state.showAddCategoryForm });
  };

  closeModalCategory = () => {
    let modalCategory = document.getElementById("modalCategory");
    let close = document.getElementById("modalCategoryClose");
    modalCategory.style.display = "none";
  };

  render() {
    console.log("/////", this.state.suggested);
    if (this.props.currentUser !== null) {
      // console.log("Current category", this.state.currentCategory);
      // console.log("current User:", this.props.currentUser._id);
      console.log("_________________++__________");

      console.log("CATEGORIES FROM BE", this.props.categoriesFromBackEnd);
      return (
        <section className="hero impactFullheight home-bg-img ">
          <div className="hero-body">
            <div className="container">
              <div>
                <div>
                  {/* <p>Category: {this.props.location.state.details.title}</p> */}
                  {this.showCategoryDetails()}
                  <div>
                    {/* start of Add Action */}

                    {/* {!this.state.showAddActForm && ( */}
                    <button
                      className="button impactButton"
                      onClick={this.showModal}
                    >
                      Add New Action
                    </button>

                    {/* {this.state.showAddActForm && ( */}
                    <div className="modal" id="modal">
                      <div className="modal-background"></div>
                      <div className="modal-content">
                        <div className="section formModal">
                          <form onSubmit={this.addNewActToDb}>
                            <p className="title h2Impact">Add New Action</p>

                            <div className="field">
                              <p className="control">
                                <input
                                  className="input"
                                  type="text"
                                  name="titleAct"
                                  placeholder="Name new action"
                                  value={this.state.titleAct}
                                  onChange={this.handleChange}
                                />
                              </p>
                            </div>

                            <div className="field">
                              <p className="control">
                                <input
                                  className="input"
                                  type="text"
                                  name="descriptionAct"
                                  placeholder="Describe new action"
                                  value={this.state.descriptionAct}
                                  onChange={this.handleChange}
                                />
                              </p>
                            </div>

                            <div className="field">
                              <p className="control">
                                <input
                                  className="input"
                                  type="number"
                                  name="valueOfAct"
                                  placeholder="How many points its worth?"
                                  min="0"
                                  value={this.state.valueOfAct}
                                  onChange={this.handleChange}
                                />
                              </p>
                            </div>

                            <div className="field">
                              <p className="control">
                                <span className="select  is-fullwidth">
                                  <select
                                    name="actCategory"
                                    onChange={this.handleChange}
                                  >
                                    <option className="option" value="0">
                                      Pick category
                                    </option>
                                    {this.props.categoriesFromBackEnd.map(
                                      oneCategory => {
                                        return (
                                          <option
                                            // value={oneCategory._id}
                                            value={oneCategory._id}
                                            key={oneCategory._id}
                                          >
                                            {oneCategory.title}
                                          </option>
                                        );
                                      }
                                    )}
                                  </select>
                                </span>
                              </p>
                            </div>
                            {/* <p>Select Category</p>
                          <select
                            name="actCategory"
                            onChange={this.handleChange}
                          >
                            <option value="">Pick category</option>
                            {this.props.categoriesFromBackEnd.map(
                              oneCategory => {
                                return (
                                  <option
                                    // value={oneCategory._id}
                                    value={oneCategory._id}
                                    key={oneCategory._id}
                                  >
                                    {oneCategory.title}
                                  </option>
                                );
                              }
                            )}
                          </select> */}

                            <div className="block">
                              <p className>
                                <button
                                  onClick={this.closeModal}
                                  className="button is-primary"
                                >
                                  Submit
                                </button>
                              </p>
                            </div>
                          </form>
                        </div>
                        <button
                          onClick={this.closeModal}
                          // id="modal-close"
                          className=" modal-close is-large"
                          aria-label="close"
                        ></button>
                      </div>

                      {/* )} */}
                    </div>
                    {/* end of Add action */}

                    <div className="column is-4 is-offset-4">
                      {this.state.currentCategory.author ===
                        this.props.currentUser._id && (
                        <div className="columns">
                          <div className="column">
                            {/* {!this.state.showEditCategoryForm && ( */}
                            <button
                              className="button is-link is-outlined"
                              onClick={this.showModalCategory}
                            >
                              Edit Category
                            </button>

                            {/* {this.state.showEditCategoryForm &&
                              this.props.location.state.details && ( */}
                            <div className="modal" id="modalCategory">
                              <div className="modal-background"></div>
                              <div className="modal-content">
                                <div className="section formModal">
                                  <form onSubmit={this.editCategoryInDb}>
                                    <p className="title h2Impact">
                                      Edit {this.state.currentCategory.title}
                                    </p>

                                    <div className="field">
                                      <p className="control">
                                        <input
                                          className="input"
                                          type="text"
                                          name="titleCat"
                                          placeholder={
                                            this.state.currentCategory.title
                                          }
                                          onChange={this.handleChange}
                                          value={this.state.titleCat}
                                        />
                                      </p>
                                    </div>

                                    <div className="field">
                                      <p className="control">
                                        <textarea
                                          className="input"
                                          type="textarea"
                                          name="descriptionCat"
                                          placeholder={
                                            this.state.currentCategory
                                              .description
                                          }
                                          value={this.state.descriptionCat}
                                          onChange={this.handleChange}
                                        />
                                      </p>
                                    </div>

                                    <div className="field">
                                      <button
                                        onClick={this.closeModalCategory}
                                        className="button is-primary"
                                      >
                                        Save changes
                                      </button>
                                    </div>
                                  </form>
                                </div>
                                <button
                                  onClick={this.closeModalCategory}
                                  className=" modal-close is-large"
                                  // id="modalCategoryClose"
                                  aria-label="close"
                                ></button>
                              </div>
                            </div>
                            {/* )} */}
                          </div>

                          <div className="column">
                            <button
                              className="button is-link is-outlined"
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
              </div>
            </div>
          </div>
        </section>
      );
    } else {
      // console.log("PROPS IN DETAILS PAGE:", this.props);
      // this.props.history.push("/");
      // return this.props.history.push("/");
      return history.push("/");
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
