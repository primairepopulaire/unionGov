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
      configRef: {
        id: 0
      },
      currentUser: null,
      positionList: [],
      candidateList: [],
      configList: [],
      govList: [],
      selectorList: []
    }
    this.updateConfig = this.updateConfig.bind(this);
    this.updateConfigRef = this.updateConfigRef.bind(this);
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
            config_ref: this.state.configRef.id
          }
        }),
      ])
      .then(axios.spread((positionRes, candidateRes, configRes) => {
        this.setState({
          positionList: positionRes.data,
          candidateList: arrayShuffle(candidateRes.data),
          configList: configRes.data
        });
        this.generateGovAndSelectorList();
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

  /**
   * initialConfig should be formatted for post in Config (i.e. only ids!)
   * 
   * @param {boolean} withRefresh 
   * @param {boolean} duplicateConfig 
   * @returns 
   */
  getNewConfigRef = (withRefresh=true, duplicateConfig=true) => 
    axios
    .post("api/configRefs/", {
      save_date: null,
      user: this.state.currentUser
    })
    .then((res) => {
      this.setState( {configRef: res.data});
      return 
    })
    .then(() => {
      if (duplicateConfig) {
        let initialConfig = this.getGenerateConfig(this.state.configRef.id);
        return axios.all(
          initialConfig.map((configData) => 
            axios.post("api/configs/", configData)
        ))
      }
      return 
    })
    .then((res) => {
      if (withRefresh) {
        this.refreshData();
      }
      return this.state.configRef;
    })
    .catch((err) => console.log(err));

  componentDidMount() {
    // Create new configRef if needed 
    if (this.state.configRef.id === 0) {
      // refresh but no duplication of config
      this.getNewConfigRef(true, false)
    }
    else {
      this.refreshData();
    }
  }

  updateConfig(positionId, candidateId) {
    console.log(`Update: position ${positionId}, candidate ${candidateId}`);

    
    let configToUpdate = this.state.configList.filter((config) =>
      config.position.id === positionId 
    ).shift();

    // if undefined, create new config!
    if (configToUpdate === undefined) {
      const configData = {
        config_ref: this.state.configRef.id,
        position: positionId,
        candidate: candidateId
      };

      axios
        .post("api/configs/", configData)
        .then((res) => {
          this.refreshData();
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
        config_ref: this.state.configRef.id,
        position: positionId,
        candidate: candidateId
      };
      
      axios
        .put(`/api/configs/${configToUpdate.id}/`, configData)
        .then((res) => this.refreshData())
        .catch((err) => console.log(err));
      
      return
    }
  }
  
  /**
   * Get current config and return it as list ready for use in post statement, using provided configRefId
   * 
   * @param {*} configRefId 
   * @returns 
   */
  getGenerateConfig(configRefId) {
    return this.state.configList
      .map((configItem) => {
        return {
          config_ref: configRefId,
          position: configItem.position.id,
          candidate: configItem.candidate.id
        }
      })
  }

  /**
   * Saves date into current configRef and creates + loads a new one
   */
  updateConfigRef() {
    let currentConfigRef = this.state.configRef;
    if (currentConfigRef.id === 0) {
      console.warning("Something wrong when saving: configRef id=0... Ignoring update call!")
      return
    }

    // Set new date to configRef
    currentConfigRef.save_date = new Date().toISOString();

    // Modify current configRef and then get new one!
    axios
    .put(`/api/configRefs/${currentConfigRef.id}/`, currentConfigRef)
    .then((res) => {
      console.log("saved config: ", currentConfigRef);
      this.getNewConfigRef(true)
        .then((res) => {
          let msg=`Saved config n° ${currentConfigRef.id}, 
ref : ${currentConfigRef.config_ref}.
          
New config n° ${res.id}, 
ref : ${res.config_ref}.`
          alert(msg);
        })
    })
    .catch((err) => console.log(err));
  }

  render() {
    return (
      <FullWidthTabs 
        candidateList={this.state.candidateList}
        govList={this.state.govList}
        updateConfig={this.updateConfig}
        selectorList={this.state.selectorList}
        updateConfigRef={this.updateConfigRef}
      />
    );
  }
}

export default App;