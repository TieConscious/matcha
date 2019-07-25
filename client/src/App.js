import React, { Component, ImageBackground, Text } from "react";
import { Container, Row, Col } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";
import AppRegistration from "./components/AppRegistration";
import AppLogin from "./components/AppLogin";
// import AppDescription from "./components/AppDescription";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="background">
          <div>
            <AppNavbar />
            <h1>Meet your bald soulmate...</h1>
            <Container className="CenterArea">
              <Row>
                <Col />

                <Col>
                  {/* <AppDescription /> */}
                </Col>
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
    );
  }
}

export default App;
