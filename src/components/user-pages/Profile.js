import React from "react";
import axios from "axios";

class Dashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treatedSuggestedActs: null,
      detailsUnfolded: false,
      // completedActs: this.props.completedActs,
      suggestedActs: this.props.currentUser.suggestedActs.slice(0, 4),
      score: this.props.currentUser.score
    };
  }

  render() {
    <div class="tabs is-centered is-boxed is-medium">
      <ul>
        <li class="is-active">
          <a>
            <span class="icon is-small">
              <i class="fas fa-image" aria-hidden="true"></i>
            </span>
            <span>Pictures</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small">
              <i class="fas fa-music" aria-hidden="true"></i>
            </span>
            <span>Music</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small">
              <i class="fas fa-film" aria-hidden="true"></i>
            </span>
            <span>Videos</span>
          </a>
        </li>
        <li>
          <a>
            <span class="icon is-small">
              <i class="far fa-file-alt" aria-hidden="true"></i>
            </span>
            <span>Documents</span>
          </a>
        </li>
      </ul>
    </div>;
  }
}

export default Dashbord;
