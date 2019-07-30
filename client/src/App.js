import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from './actions/authActions';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";
import AppRegistration from "./components/AppRegistration";
// import AppDescription from "./components/AppDescription";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="background">
            <div>
              <AppNavbar />
              <h1>Meet your bald soulmate...</h1>
              <Container className="CenterArea">
                <Row>
                  <Col />

                  <Col>{/* <AppDescription /> */}</Col>
                  <Col>
                    <AppRegistration />
                  </Col>
                  <Col />
                </Row>
              </Container>
            </div>
          </div>
          <AppFooter />
        </div>
      </Provider>
    );
  }
}

export default App;
