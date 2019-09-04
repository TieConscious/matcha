import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarBrand,
  NavLink
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NotificationsCup from "./NotificationsCup";
import AppLogin from "./AppLogin";
import AppLogout from "./AppLogout";
import { Link } from "react-router-dom";
import {
  updateNotifications,
  getNotificationArray
} from "../actions/updateActions";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    notifications: PropTypes.array
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  intervalID;

  componentDidMount() {
    console.log(this.props.auth);
    this.intervalID = setInterval(this.getData.bind(this), 3000);
    if (this.props.auth.user) {
      this.props.updateNotifications(this.props.auth.user._id);
    }
  }

  getData = () => {
    if (this.props.auth.user) {
      this.props.updateNotifications(this.props.auth.user._id);

      if (this.props.notifications)
        this.props.getNotificationArray(this.props.notifications);
    }
  };

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.firstname}` : ""}</strong>
          </span>
        </NavItem>
        {/* <span className="navbar-text"> */}
        <NavItem>
          {/* <Link to="/dashboard"> Dashboard </Link> */}
          <NavLink tag={Link} to="/dashboard">
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          {/* <Link to="/settings">Settings </Link> */}
          <NavLink tag={Link} to="/settings">
            Settings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/select">
            Select
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/explore">
            Explore
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/messenger">
            Messenger
          </NavLink>
        </NavItem>

        <AppLogout />
        {/* </span> */}
      </>
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
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <NotificationsCup />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  notifications: state.auth.notifications
});

export default connect(
  mapStateToProps,
  { updateNotifications, getNotificationArray }
)(AppNavbar);
