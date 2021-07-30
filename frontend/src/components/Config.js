import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";

import "./Candidates.css";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class Candidates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      govList: props.govList,
      selectorList: props.selectorList,
      updateConfig: props.updateConfig
    };
  }

  renderItems = () => {
    const newItems = this.state.govList;
    const options = this.state.selectorList;

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          <span>{item.position_name}</span>
          <span>
            <Select 
              className="candidateSelector" 
              options={options} 
              onChange={(event) => this.state.updateConfig(item.id, event.value)}
              isOptionDisabled={(option) => option.disabled}
              defaultValue={options.filter((option) => (option.value===item.candidate_id))[0]}
            />
          </span>
        </span>
        <span>
          <img 
            className="candidatePicture" 
            src={item.image_url} 
            alt={item.position_name}
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