import React, { Component } from "react";

class addAct extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const newTitle = this.newTitle.current.value;
    console.log("Submited");
  };

  render() {
    return (
      <div>
        <h1>Add Act</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="newTitle">Title of New Act</label>
            <input autoFocus ref={this.newTitle} id="newTitle" type="text" />
          </div>

          <div>
            <label htmlFor="newDescription">Describe Act</label>
            <input id="newDescription" type="textarea" />
          </div>

          <div>
            <label htmlFor="newValue">Value</label>
            <input id="newValue" type="number" />
          </div>

          <div>
            <select name="category">Select Category</select>
            <option value="first">First</option>
            <option value="second">Second</option>
          </div>

          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default addAct;
