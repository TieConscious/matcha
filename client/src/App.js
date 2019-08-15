import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import Geocode from "react-geocode";

import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";

import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import Settings from "./components/Settings";
import SelectingPage from "./components/SelectingPage";
import Explore from "./components/Explore";
import Geo from "./components/geo";
// import AppDescription from "./components/AppDescription";

class App extends Component {
  componentDidMount() {
    Geocode.setApiKey("");
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="background">
          <div>
            <Router>
              <AppNavbar />
              <div>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/select" component={SelectingPage} />
                <Route exact path="/explore" component={Explore} />
                <Route exact path="/geo" component={Geo} />
              </div>
            </Router>
          </div>
          <AppFooter />
        </div>
      </Provider>
    );
  }
}

export default App;
