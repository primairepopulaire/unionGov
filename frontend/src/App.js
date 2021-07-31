import React, { Component } from "react";
import FullWidthTabs from "./components/Tabs";

import arrayShuffle from 'array-shuffle';

// Axios for link to backend
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


class App extends Component {
  constructor() {
    super();
    this.state = {
      configRef: 1,
      positionList: [],
      candidateList: [],
      configList: [],
      govList: [],
      selectorList: []
    }
    this.updateConfig = this.updateConfig.bind(this);
  }

  refreshData = () => {
    axios
      .all([
        axios
          .get("/api/positions/"),
        axios
          .get("/api/candidates/"),
        axios.get("api/richConfigs/", {
          params: {
            config_ref: this.state.configRef
          }
        }),
      ])
      .then(axios.spread((positionRes, candidateRes, configRes) => {
        this.setState({
          positionList: positionRes.data,
          candidateList: arrayShuffle(candidateRes.data),
          configList: configRes.data
        });
        console.log("Got data...");
        this.generateGovAndSelectorList();
        console.log("generateGovAndSelectorList started...");
      }))
      .catch((err) => console.log(err));
  }

  /**
   * Generate both config and selector from existing data 
   * 
   * Uses positionList to get all positions to consider
   * 
   * @param {*} data 
   */
  generateGovAndSelectorList = () => {

    // Collect selected candidates
    const selectedCandidateId = this.state.configList.map(
      (config)=> config.candidate.id);

    // Refresh selector list
    let selectorList = this.state.candidateList.map((candidate) => {
      return {
          value: candidate.id,
          label: `${candidate.first_name} ${candidate.last_name}`,
          disabled: selectedCandidateId.includes(candidate.id)
      }
    });

    selectorList.unshift({
      value: 0,
      label: "-",
      disabled: false
    });
    
    this.setState({ selectorList: selectorList });

    // Generate govList 
    const selectedPositions = this.state.configList.map(
      (config) => config.position.id);

    let govList = this.state.positionList.slice();

    govList = govList.map((position) => {
      if (selectedPositions.includes(position.id)) {
        const positionConfig = this.state.configList
          .filter((config) => config.position.id === position.id)[0];
        
        return {
          id: position.id,
          position_name: position.position_name,
          candidate_id: positionConfig.candidate.id,
          image_url: positionConfig.candidate.image_url
        }
      }
      else {
        // Default value
        return {
          id: position.id,
          position_name: position.position_name,
          candidate_id: 0,
          image_url: "https://www.parrainages-primairepopulaire.fr/file/primaire_candidat_mystere.png"
        }
      }
    });

    this.setState({ govList: govList});
  }

  componentDidMount() {
    this.refreshData();
  }

  updateConfig(positionId, candidateId) {
    console.log(`Update: position ${positionId}, candidate ${candidateId}`);

    
    let configToUpdate = this.state.configList.filter((config) =>
      config.position.id === positionId 
    ).shift();

    // if undefined, create new config!
    if (configToUpdate === undefined) {
      const configData = {
        config_ref: this.state.configRef,
        position: positionId,
        candidate: candidateId
      };

      console.log(configData);

      axios
        .post("api/configs/", configData)
        .then((res) => {
          console.log("Got result! ", res);
          this.refreshData();
          console.log("Refresh started...");
        })
        .catch((err) => console.log(err));
      return
    }

    if (configToUpdate.candidate.id !== candidateId) {
      configToUpdate.candidate=candidateId

      if (candidateId === 0) {
        // Delete config
        axios
          .delete(`api/configs/${configToUpdate.id}/`)
          .then((res) => this.refreshData())
          .catch((err) => console.log(err));
        return
      }

      let newCandidate = this.state.candidateList.filter((candidate) => 
       candidate.id === candidateId).shift();

      if (newCandidate === undefined) {
        throw new Error(`Unknown candidate id=${candidateId}`) 
      }

      const configData = {
        config_ref: this.state.configRef,
        position: positionId,
        candidate: candidateId
      };
      
      axios
        .put(`/api/configs/${configToUpdate.id}/`, configData)
        .then((res) => this.refreshData())
        .catch((err) => console.log(err));
    }
  }


  render() {
    return (
      <FullWidthTabs 
        candidateList={this.state.candidateList}
        govList={this.state.govList}
        updateConfig={this.updateConfig}
        selectorList={this.state.selectorList}
      />
    );
  }
}

export default App;