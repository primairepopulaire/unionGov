import React, { Component } from "react";
import axios from "axios";

import "./Candidates.css";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class Candidates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateList: this.props.candidateList
    };
  }

  renderItems = () => {
    const newItems = this.state.candidateList;

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          {item.first_name} {item.last_name}
        </span>
        <span>
          <img 
            className="candidatePicture" 
            src={item.image_url} 
            alt={item.last_name}
          ></img>
        </span>
      </li>
    ));
  };

  render() {
    return (
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default Candidates;