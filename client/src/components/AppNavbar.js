import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from "reactstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import './AppNavbar.css';
import AppLogin from "./AppLogin";
import AppLogout from "./AppLogout";
import { Link } from 'react-router-dom';
import matcha from "../img/matcha.png";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    console.log(this.props);
    const { isAuthenticated, user } = this.props.auth;
    console.log(user);
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.firstname}` : ""}</strong>
          </span>
        </NavItem>
        <NavItem>
          <AppLogout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <AppLogin />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="light" light expand="sm" className="mb-5">
          <Container> 
              <NavbarBrand>
                <Link to="/"><img src={matcha} color="white" width="30" height="30" /></Link>
              </NavbarBrand>
            <NavbarToggler onClick={this.toggle} color="black"/>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
