import React, { Component } from "react";

import { connect } from "react-redux";
import ComposeMessage from "./ComposeMessage";
import { updateMessage } from "../actions/updateActions";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import MessageBox from "./MessageBox";

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
    currentConversation: PropTypes.object,
    currentConverser: PropTypes.string
  };

  messagesEndRef = React.createRef()

  componentDidMount() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (this.props.currentConversation != null) {
      this.props.updateMessage(this.props.currentConversation._id);
    }
    this.scrollToBottom()
  }

  // componentDidUpdate () {
  //   this.scrollToBottom()
  // }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  getUser = id => {
    if (id === this.props.auth.user._id)
      return ("you");
    return (this.props.currentConverser);
  };

  render() {
    return (
      <div>
        <div>
          {/* {this.props.currentConversation
            ? this.props.currentConversation.messages.map(
                message => <div> {message.message} </div>
              )
            : ""} */}
          {this.props.currentConversation
            ? this.props.currentConversation.messages.map((message, index) => (
                <MessageBox
                  key={index}
                  user={this.getUser(message.sender)}
                  message={message.message}
                />
              ))
            : ""}
        </div>
        <div ref={this.messagesEndRef} />
        <div>{this.props.currentConversation ? <ComposeMessage /> : ""}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  currentConversation: state.auth.currentConversation,
  currentConverser: state.auth.currentConverser
});

export default connect(
  mapStateToProps,
  { updateMessage }
)(withStyles(styles)(MessengerChat));
