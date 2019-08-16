import React, { Component } from "react";

import MessengerSidebar from "./MessengerSidebar";
import MessengerChat from "./MessengerChat";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

export class Messenger extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <Box>
        hello
        <Grid item xs={4}>
          <MessengerSidebar />
        </Grid>
        <Grid item xs={8}>
          <MessengerChat />
        </Grid>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(Messenger);
