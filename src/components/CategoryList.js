import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesFromBackEnd: null
    };
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:3001/category/allCats")
      .then(responseCategories => {
        // console.log("Response is: ", responseCategories.data);
        this.setState({
          categoriesFromBackEnd: responseCategories.data
        });
      })
      .catch(err => console.log("Err while getting categories: ", err));
  };

  displayCat() {
    // console.log(this.state.categoriesFromBackEnd);
    return this.state.categoriesFromBackEnd.allCategories.map((oneCat, i) => {
      console.log(oneCat._id);
      return (
        <Link
          key={i}
          to={{
            pathname: `/category/${oneCat._id}`,
            state: {
              theId: oneCat._id,
              details: oneCat
            }
          }}
        >
          {/* this is actual props we're passing */}
          <p key={i}>{oneCat.title}</p>
        </Link>
      );
    });
  }

  render() {
    return <div>{this.state.categoriesFromBackEnd && this.displayCat()}</div>;
  }
}
