import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/core/styles";

const styles = {
  paper: {

  },
};

export class MessengerSidebar extends Component {
  static propTypes = {
	auth: PropTypes.object.isRequired,
  };

  render() {
    return (
		<div>

    </div>
    );
  }
}

const mapStateToProps = state => ({
	auth: state.auth,
	isAuthenticated: state.auth.isAuthenticated,
  });

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(MessengerSidebar));
