import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container
} from "reactstrap";
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import './AppNavbar.css';
import AppLogin from "./AppLogin";
import AppLogout from "./AppLogout";
import { Link } from "react-router-dom";
import matcha from "../img/matcha.png";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };



  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.firstname}` : ""}</strong>
          </span>
        </NavItem>
        <span className="navbar-text mr-3">
<<<<<<< HEAD

          <Link to="/dashboard">Dashboard</Link>

        <Link to="/settings">Settings</Link>
        <Link to="/select">Select</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/messenger">Messenger</Link>

          <AppLogout />

        </span>
=======
          <NavItem>
            <Link to="/dashboard">Dashboard</Link>
          </NavItem>
          <NavItem>
          <Link to="/settings">Settings</Link>
          </NavItem>
          <NavItem>
          <Link to="/select">Select</Link>
          </NavItem>
          <NavItem>
          <Link to="/explore">Explore</Link>
          </NavItem>
          <NavItem>
          <Link to="/messenger">Messenger</Link>
          </NavItem>
        </span>
          <NavItem>
            <AppLogout />
          </NavItem>
        
>>>>>>> e805d15b7d43d476a0ae3a80a98f201710616051
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
        <Navbar color="light" light expand="sm">
          <Container>
            <Link to="/">
              <img
                src={matcha}
                alt="mug"
                color="white"
                width="30"
                height="30"
              />
            </Link>
            <NavbarToggler onClick={this.toggle} color="black" />
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
