import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import ComposeMessage from "./ComposeMessage";
import { updateMessages, retrieveMessages } from "../actions/updateActions";

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
    currentConversation: PropTypes.object
  };

  state = {
   currentConversation: this.props.currentConversation
  };

  componentDidMount() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
    console.log(this.props.currentConversation);
    if (this.props.currentConversation) {
      this.props.updateMessages(this.props.currentConversation._id);
      this.setState({ currentConversation: this.props.currentConversation });
    }
  }

  // componentDidUpdate() {
  //   if (this.props.currentConversation) {
  //     console.log(this.props.currentConversation);
  //     this.props.updateMessages(this.props.currentConversation._id);
  //   }
  // }

  // componentDidUpdate(prevProps) {

  //     console.log("updated");
  //     console.log(this.props.currentConversation)
  // }

  render() {
    console.log(this.props.currentConversation);
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
  currentConversation: state.auth.currentConversation
});

export default connect(
  mapStateToProps,
  { updateMessages, retrieveMessages }
)(withStyles(styles)(MessengerChat));
