import React from "react";
import axios from "axios";

import CategoryList from "./category-components/CategoryList";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // categoriesFromBackEnd: null,
      showAddCategoryForm: false,
      titleCategory: "",
      descriptionCategory: ""
    };
  }

  //  to be able to Add new Category
  // componentDidMount = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_IMPACT_SERVER}/category/allCats`)
  //     .then(responseCategories => {
  //       console.log(
  //         "Categories from DB: ",
  //         responseCategories.data.allCategories
  //       );
  //       this.setState({
  //         categoriesFromBackEnd: responseCategories.data.allCategories
  //       });
  //     })
  //     .catch(err => console.log("Err while getting categories: ", err));
  // };

  // displayCat() {
  //   // console.log(this.state.categoriesFromBackEnd);
  //   return this.state.categoriesFromBackEnd.allCategories.map((oneCat, i) => {
  //     console.log(oneCat._id);
  //     return (
  //       <Link to="/category/{{oneCat._id}}" key={i} catId={oneCat._id}>
  //         <p key={i}>{oneCat.title}</p>
  //       </Link>
  //     );
  //   });

  addNewCategory = e => {
    e.preventDefault();

    let listOfCategories = [...this.props.categoriesFromBackEnd];

    let newCategory = {
      title: this.state.titleCategory,
      description: this.state.descriptionCategory
    };

    listOfCategories.unshift(newCategory);

    this.setState({
      titleCategory: "",
      descriptionCategory: "",
      showAddCategoryForm: false
    });

    axios
      .post(
        `${process.env.REACT_APP_IMPACT_SERVER}/category/create`,
        newCategory
      )
      .then(newCategory => {
        alert("{newCategory.title} was added");
        {
          /* add some success message */
        }
      })
      .catch(err => console.log("Error while adding the new Category ", err));
  };

  updateInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleForm = () => {
    this.setState({ showAddCategoryForm: !this.state.showAddCategoryForm });
  };

  render() {
    if (this.props.currentUser !== null) {
      // console.log("___________", this.props.history);
      // console.log(this.props.currentUser.fullName);
      // console.log("categoriesFromBackEnd: ", this.props.categoriesFromBackEnd);
      return (
        <div>
          <h1>Impact</h1>
          <h3>All categories:</h3>
          <CategoryList
            categoriesFromBackEnd={this.props.categoriesFromBackEnd}
          />

          {!this.state.showAddCategoryForm && (
            <button onClick={this.toggleForm}>Add New Category</button>
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
      );
    } else return "Loading";
  }
}
