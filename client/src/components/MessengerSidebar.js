import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import MessengerListItem from "./MessengerListItem";
import { setConversation } from "../actions/updateActions";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
  paper: {}
};

export class MessengerSidebar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    conversations: PropTypes.array
  };

  render() {
    return (
      <div>
        {this.props.conversations
          ? this.props.conversations.map((convo, index) => (
              <MessengerListItem key={index} data={convo} />
            ))
          : ""}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  conversations: state.auth.conversations
});

export default connect(
  mapStateToProps,
  { setConversation }
)(withStyles(styles)(MessengerSidebar));
