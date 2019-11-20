import React from "react";
import { Link } from "react-router-dom";

function CategoryList(props) {
  console.log("PROPS CATEGORY:", props);
  if (!props.currentUser) {
    // console.log(">>>>", props.categoriesFromBackEnd);

    return props.categoriesFromBackEnd.map((oneCat, i) => {
      return (
        <div className="card column is-3">
          <header>
            <Link
              key={i}
              to={{
                pathname: "/login-page"
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
  } else {
    return props.categoriesFromBackEnd.map((oneCat, i) => {
      return (
        <div className="column is-3">
          <div className="card">
            <header className="card-header">
              <Link
                {...props}
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
        </div>
      );
    });
  }
}

export default CategoryList;
