import React, { Component } from "react";
import { connect } from "react-redux";
import MessengerListItem from "./MessengerListItem";
import { getChattersArray } from "../actions/updateActions";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";


const styles = {
  paper: {}
};

export class MessengerSidebar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    conversations: PropTypes.array,
    chattersArray: PropTypes.array
  };

  matchChatSender = convo => {
    var sender;
    if (this.props.chattersArray) {
      for (var i = 0; i < this.props.chattersArray.length; i++) {
        console.log(this.props.chattersArray[i]);
        console.log(this.props.auth.user._id);
        if (this.props.chattersArray[i]._id === convo.participants[0] && convo.participants[0] !== this.props.auth.user._id) {
          sender = this.props.chattersArray[i].firstname;
          console.log(sender);
          return sender;
        }
        else if (this.props.chattersArray[i]._id === convo.participants[1] && convo.participants[1] !== this.props.auth.user._id) {
          sender = this.props.chattersArray[i].firstname;
          console.log(sender);
          return sender;
        }
      }
    }
    return "loading user...";
  };

  render() {
    return (
      <div>
        {this.props.conversations
          ? this.props.conversations.map((convo, index) => (
              <MessengerListItem
                key={index}
                sender={this.matchChatSender(convo)}
                data={convo}
              />
            ))
          : ""}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  conversations: state.auth.conversations,
  chattersArray: state.auth.chattersArray
});

export default connect(
  mapStateToProps,
  { getChattersArray }
)(withStyles(styles)(MessengerSidebar));
