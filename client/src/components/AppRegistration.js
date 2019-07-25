import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

import './css/AppRegistration.css'

class AppRegistration extends Component {
  render() {
    return (
      <div className="Registration">
        <Card>
          <CardBody>
            <h3>Register:</h3>
            <Form>
              <Input style={{ marginTop: '0.5rem' }} type="email" placeholder="email" />
              <Input style={{ marginTop: '0.5rem' }} type="password" placeholder="password" />
              <Button style={{ marginTop: '0.5rem' }} color="primary">Register</Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AppRegistration;
