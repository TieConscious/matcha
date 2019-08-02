import React, { Component } from "react";
import { Card, CardBody, Button, Form, Input, Row, Col, Alert } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";

class AppRegistration extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { firstname, lastname, email, password } = this.state;

    const newUser = {
      firstname,
      lastname,
      email,
      password
    };

    this.props.register(newUser);
  };

  render() {
    return (
      <div className="registration">
        <Card>
          <CardBody>
            <h3>Register:</h3>
            <Form onSubmit={this.onSubmit}>
              {this.state.msg ? (
                <Alert color="danger">{this.state.msg}</Alert>
              ) : null}
              <Row>
                <Col>
                  <Input
                    style={{ marginTop: "0.5rem"}}
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="first name"
                    onChange={this.onChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    style={{ marginTop: "0.5rem" }}
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="last name"
                    onChange={this.onChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    style={{ marginTop: "0.5rem" }}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                    onChange={this.onChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    style={{ marginTop: "0.5rem" }}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    onChange={this.onChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button style={{ marginTop: "1.5rem" }} color="primary">
                    Register
                  </Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
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
  { register, clearErrors }
)(AppRegistration);
