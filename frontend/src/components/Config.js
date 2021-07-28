import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";

import "./Candidates.css";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

var options = [
  { value: "C. Taubira", label: "Christiane Taubira"},
  { value: "J.-L. Mélenchon", label: "Jean-Luc Mélenchon"},
  { value: "É. Piolle", label: "Éric Piolle" }
]

class Candidates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionList: [],
      candidateList: []
    };
  }



  componentDidMount() {
    this.refreshPositionList();
    //this.refreshCandidateList();
  }

  refreshPositionList = () => {
    axios
      .get("/api/positions/")
      .then((res) => this.setState({ positionList: res.data }))
      .catch((err) => console.log(err));
  };

  refreshCandidateList = () => {
    axios
      .get("/api/candidates/")
      .then((res) => this.setState({ candidateList: res.data }))
      .catch((err) => console.log(err));
  };

  renderItems = () => {
    const newItems = this.state.positionList;

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          <p>{item.position_name}</p>
          <p>
            <Select 
              className="candidateSelector" 
              options={options} 
            />
          </p>
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