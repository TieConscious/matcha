import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";

import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
// import AppDescription from "./components/AppDescription";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="background">
          <div>
            <AppNavbar />
            <Router>
              <div>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/dashboard" component={Dashboard} />
              </div>
            </Router>
          </div>
          <AppFooter />
        </div>
        {/* <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch> */}
      </Provider>
    );
  }
}

export default App;
