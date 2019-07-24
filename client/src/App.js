import React, { Component, ImageBackground, Text } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="background">
          <div>
            <AppNavbar />
          </div>
        </div>
        <AppFooter />
      </div>
    );
  }
}

export default App;
