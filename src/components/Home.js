import React from "react";
import axios from "axios";

import CategoryList from "./category-components/CategoryList";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddCategoryForm: false,
      titleCategory: "",
      descriptionCategory: "",
      categoriesFromBackEnd: this.props.categoriesFromBackEnd
    };
  }

  addNewCategory = e => {
    e.preventDefault();

    let listOfCategories = [...this.props.categoriesFromBackEnd];

    let newCategory = {
      title: this.state.titleCategory,
      description: this.state.descriptionCategory,
      author: this.props.currentUser
    };

    listOfCategories.unshift(newCategory);

    this.setState({
      titleCategory: "",
      descriptionCategory: "",
      showAddCategoryForm: false,
      categoriesList: listOfCategories
    });

    axios
      .post(
        `${process.env.REACT_APP_IMPACT_SERVER}/category/create`,
        newCategory
      )
      .then(newCategory => {
        this.props.getAllCategories();

        {
          /* add some success message */
        }
      })
      .catch(err => console.log("Error while adding the new Category ", err));
    console.log("Author:", this.props.currentUser);

    console.log("New Category is:", newCategory);
  };

  updateInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // toggleForm = () => {
  //   this.setState({ showAddCategoryForm: !this.state.showAddCategoryForm });
  // };

  showModal = () => {
    let displayModal = document.getElementById("displayModal");
    let modal = document.getElementById("modal");
    let close = document.getElementsByClassName("modal-close")[0];

    modal.style.display = "block";
    // this.setState({ showAddCategoryForm: !this.state.showAddCategoryForm });
  };

  closeModal = () => {
    let modal = document.getElementById("modal");
    let close = document.getElementsByClassName("modal-close")[0];
    modal.style.display = "none";
  };

  render() {
    // this.props.getAllCategories();
    console.log("PROPS HOME PAGE", this.props);
    console.log("HOME | USER", this.props.currentUser);

    if (this.props.categoriesFromBackEnd !== null) {
      // console.log(this.props.currentUser.fullName);
      // console.log("categoriesFromBackEnd: ", this.props.categoriesFromBackEnd);
      return (
        <section className="hero impactFullheight home-bg-img ">
          <div className="hero-body">
            <div className="container">
              <div>
                <p className="h1Impact">Think global | Act Local</p>
                {/* <p className="subtitle is-1">Act local</p> */}
              </div>

              <section className="section">
                <h3 className="title h2Impact">Pick category:</h3>

                <div className="columns  is-multiline is-8 is-variable">
                  <CategoryList
                    categoriesFromBackEnd={this.props.categoriesFromBackEnd}
                    currentUser={this.props.currentUser}
                    className="column"
                  />
                </div>
              </section>
              {/* {!this.state.showAddCategoryForm && this.props.currentUser && ( */}
              <button onClick={this.showModal} className="button impactButton">
                Add New Category
              </button>
              {/* )} */}

              <div className="modal" id="modal">
                <div className="modal-background"></div>
                <div className="modal-content">
                  <div className="section formModal">
                    <form onSubmit={this.addNewCategory}>
                      <p className="title h2Impact">Add New Category</p>
                      <div className="field">
                        <p className="control">
                          <input
                            className="input"
                            type="text"
                            name="titleCategory"
                            placeholder="New category title"
                            onChange={this.updateInput}
                            value={this.state.titleCategory}
                          />
                        </p>
                      </div>

                      <div className="field">
                        <p className="control">
                          <textarea
                            className="input"
                            type="textarea"
                            name="descriptionCategory"
                            placeholder="New category description"
                            onChange={this.updateInput}
                            value={this.state.descriptionCategory}
                          />
                        </p>
                      </div>
                      <div className="field">
                        <button
                          onClick={this.closeModal}
                          className="button is-primary"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  <button
                    onClick={this.closeModal}
                    className="modal-close is-large"
                    aria-label="close"
                  ></button>
                </div>
              </div>

              {/* {this.state.showAddCategoryForm && (
                <form onSubmit={this.addNewCategory}>
                  <p className="title is-4">Add New Category</p>
                  <div className="field">
                    <p className="control">
                      <input
                        className="input"
                        type="text"
                        name="titleCategory"
                        placeholder="New category title"
                        onChange={this.updateInput}
                        value={this.state.titleCategory}
                      />
                    </p>
                  </div>

                  <div className="field">
                    <p className="control">
                      <textarea
                        className="input"
                        type="textarea"
                        name="descriptionCategory"
                        placeholder="New category description"
                        onChange={this.updateInput}
                        value={this.state.descriptionCategory}
                      />
                    </p>
                  </div>
                  <div className="field">
                    <button className="button">Submit</button>
                  </div>
                </form>
              )} */}
            </div>
          </div>
        </section>
      );
    } else
      return (
        <button onClick={this.showModal} className="button">
          Add New Category
        </button>
      );
  }
}
