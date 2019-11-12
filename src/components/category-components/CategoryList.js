import React from "react";
import { Link } from "react-router-dom";

function CategoryList(props) {
  if (props.categoriesFromBackEnd !== null) {
    // console.log(">>>>", props.categoriesFromBackEnd);
    // console.log("this is the current state >>>>>>>>>> ", this.state);

    return props.categoriesFromBackEnd.map((oneCat, i) => {
      return (
        <div className="card column">
          <header>
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
              <p className="card-header-title is-centered" key={i}>
                {oneCat.title}
              </p>
            </Link>
          </header>
          <div className="card-content">
            <div className="content">
              <p key={i}>{oneCat.description}</p>
            </div>
          </div>
        </div>
      );
    });
  } else return "Loading...";
}

export default CategoryList;
