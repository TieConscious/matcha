import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

export class MessengerSidebar extends Component {
  static propTypes = {
	auth: PropTypes.object.isRequired,
  };

  render() {
    return (
		<>hello</>
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
)(MessengerSidebar);
