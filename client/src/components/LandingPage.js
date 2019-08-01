import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

import AppRegistration from "./AppRegistration";

class LandingPage extends Component {
  render() {
    return (
      <div classname="background">
        <h1>Meet your bald soulmate...</h1>
        <Container className="CenterArea">
          <Row>
            <Col />

            <Col>{/* <AppDescription /> */}</Col>
            <Link to="/dashboard">Dashboard</Link>
            <Col>
              <AppRegistration />
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  }
}

export default LandingPage;
