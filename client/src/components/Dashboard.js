import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { logout } from '../actions/authActions';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


class Dashboard extends Component {

	componentDidMount() {
		// If logged in and user navigates to Dashboard page, should redirect them to landing page
		if (!this.props.isAuthenticated) {
		  this.props.history.push("/");
		}
	  }

	  componentDidUpdate() {
		// If logged in and user navigates to Dashboard page, should redirect them to landing page
		if (!this.props.isAuthenticated) {
		  this.props.history.push("/");
		}
	  }

	render () {
		return (
			<div>
				Hello thar! moo gay
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
  });

  export default connect(mapStateToProps, null)(Dashboard);
