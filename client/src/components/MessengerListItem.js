import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { updateMessages } from "../actions/updateActions";

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

    console.log(this.props.data);
    const conversationID = this.props.data;
    console.log(conversationID);

    // this.props.updateMessages(conversationID);
  }


  render() {
    console.log(this.props.conversations);
    return (
      <div>
        {
          this.props.conversations ? <h1>buttholes</h1> : ""
        }
        </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  conversations: state.conversations
});

export default connect(
  mapStateToProps,
  { updateMessages }
)(withStyles(styles)(MessengerListItem));
