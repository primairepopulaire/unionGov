import React, { Component } from "react";
import FullWidthTabs from "./components/Tabs";


// Axios for link to backend
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


class App extends Component {

  render() {
    return (
      <FullWidthTabs />
    );
  }
}

export default App;