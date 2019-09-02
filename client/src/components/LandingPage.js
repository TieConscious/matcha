import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import AppRegistration from "./AppRegistration";
import FacebookLoginButton from './FacebookLoginButton';

class LandingPage extends Component {
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="landing-title">
          <Typography variant="h5" component="h3">
            Meet your bald soulmate...
          </Typography>
        </div>
        <Container className="CenterArea">
          <Row>
            <Col>{/* <AppDescription /> */}</Col>
            <Col>
              <AppRegistration />
            </Col>
            <Col />
          </Row>
          {/* <FacebookLoginButton /> */}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  null
)(LandingPage);
