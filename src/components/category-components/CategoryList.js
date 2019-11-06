import React from "react";
import { Link } from "react-router-dom";

function CategoryList(props) {
  if (props.categoriesFromBackEnd !== null) {
    // console.log(">>>>", props.categoriesFromBackEnd);
    // console.log("this is the current state >>>>>>>>>> ", this.state);

    return props.categoriesFromBackEnd.map((oneCat, i) => {
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
          <p key={i}>{oneCat.title}</p>
        </Link>
      );
    });
  } else return "Loading...";
}

export default CategoryList;
