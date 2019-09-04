import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import PropTypes from 'prop-types';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  handleClick = () => {
    this.props.logout(this.props.user._id);
    console.log(this.props.user._id);
  }
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.handleClick} href='#'>
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { logout }
)(Logout);
