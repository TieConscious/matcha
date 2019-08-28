import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import ComposeMessage from "./ComposeMessage";

import PropTypes from "prop-types";

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
    conversations: PropTypes.array,
    currentConversation: PropTypes.object
  };

  render() {
    if (this.props.currentConversation)
      console.log(this.props.currentConversation.messages);
    return (
      <div>
        <div>
          {this.props.currentConversation
            ? this.props.currentConversation.messages.map(
                message => `${message.message}`
              )
            : ""}
        </div>
        <div>{this.props.currentConversation ? <ComposeMessage /> : ""}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  conversations: state.auth.conversations,
  currentConversation: state.auth.currentConversation
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(MessengerChat));
