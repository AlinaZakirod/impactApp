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

  toggleForm = () => {
    this.setState({ showAddCategoryForm: !this.state.showAddCategoryForm });
  };

  render() {
    if (this.props.categoriesFromBackEnd !== null) {
      // this.props.getAllCategories();
      // console.log("___________", this.props);
      // console.log(this.props.currentUser.fullName);
      // console.log("categoriesFromBackEnd: ", this.props.categoriesFromBackEnd);
      return (
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container">
              <div>
                <p className="subtitle is-1 is-red">Think global | Act Local</p>
                {/* <p className="subtitle is-1">Act local</p> */}
              </div>

              <section className="section">
                <h3 className="title is-3">All categories:</h3>

                <div className="columns  is-multiline is-8 is-variable">
                  <CategoryList
                    categoriesFromBackEnd={this.props.categoriesFromBackEnd}
                    className="column"
                  />
                </div>
              </section>
              {!this.state.showAddCategoryForm && this.props.currentUser && (
                <button onClick={this.toggleForm} className="button">
                  Add New Category
                </button>
              )}

              {this.state.showAddCategoryForm && (
                <form onSubmit={this.addNewCategory}>
                  <h3>Add New Category</h3>
                  <p>Title</p>
                  <input
                    name="titleCategory"
                    type="text"
                    value={this.state.titleCategory}
                    onChange={this.updateInput}
                  />
                  <p>Description</p>
                  <input
                    name="descriptionCategory"
                    type="text"
                    value={this.state.descriptionCategory}
                    onChange={this.updateInput}
                  />
                  <button>Submit</button>
                </form>
              )}
            </div>
          </div>
        </section>
      );
    } else return "Loading";
  }
}
