import React, { Component } from "react";
import FullWidthTabs from "./components/Tabs";


// Axios for link to backend
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


class App extends Component {
  constructor() {
    super();
    this.state = {
      positionList: [],
      candidateList: []
    }
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

  componentDidMount() {
    this.refreshPositionList();
    this.refreshCandidateList();
  }


  render() {
    return (
      <FullWidthTabs 
        candidateList={this.state.candidateList}
        positionList={this.state.positionList}
      />
    );
  }
}

export default App;