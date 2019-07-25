import React, { Component } from "react";
import {
  Nav,
  NavItem,
  Button,
  Form,
  Row,
  Col,
  Input,
  FormText
} from "reactstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

class AppLogin extends Component {


  render() {
    return (
      <div className="Registration">
        <Form>

            <Row>
              <Col>
              <Input type="email" name="email" id="email" placeholder="email" />
              </Col>
            {/* <NavItem style={{ marginRight: "0.5rem" }}> */}
              <Col>
              <Input type="password" name="password" id="password" placeholder="password" />
              </Col>
              <Col>
              <Button color="primary">Login</Button>
              </Col>
        </Row>
        </Form>
      </div>
    );
  }
}

export default AppLogin;
