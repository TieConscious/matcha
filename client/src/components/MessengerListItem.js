import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { setConversation } from "../actions/updateActions";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  paper: {}
};

export class MessengerListItem extends Component {
  componentDidMount() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  updateCurrentConversation = e => {
    console.log(this.props.data);
    this.props.setConversation(this.props.data)
  }

  render() {
    const { participants, messages } = this.props.data;

    return (
      <div onClick={this.updateCurrentConversation}>
        {this.props.data
          ? `${participants}\n${messages[messages.length - 1].message}`
          : ""}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setConversation }
)(withStyles(styles)(MessengerListItem));
