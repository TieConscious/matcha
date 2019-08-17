import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/core/styles";

const styles = {
  paper: {
    flex: "1",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "40vh",
    margin: "auto",
    paddingTop: "5vh"
  },
  button: {
    margin: "10px"
  },
  textField: {
    margin: "auto"
  },
  profile: {
    height: "100px",
    borderRadius: "50%"
  }
};

export class MessengerChat extends Component {
  static propTypes = {
	auth: PropTypes.object.isRequired,
  };

  render() {
    return (
		<div>hello</div>
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
)(withStyles(styles)(MessengerChat));
