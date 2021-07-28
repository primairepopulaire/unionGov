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
      positionList: props.positionList,
      candidateList: props.candidateList
    };
  }

  formatCandidateOption = (candidate) => {
    return {
      value: candidate.id,
      label: `${candidate.first_name} ${candidate.last_name}`,
      disabled: (candidate.id %2 === 0)? true: false
    }
  }

  change = (i) => { return (event) => {
      console.log(`From position ${i}`, event);
    }
  }

  renderItems = () => {
    const newItems = this.state.positionList;
    const options = this.state.candidateList.map(
      item => this.formatCandidateOption(item));

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
              onChange={this.change(item.id)}
              isOptionDisabled={(option) => option.disabled}
            />
          </span>
        </span>
        <span>
          <img 
            className="candidatePicture" 
            src="https://www.parrainages-primairepopulaire.fr/file/primaire_candidat_mystere.png" 
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