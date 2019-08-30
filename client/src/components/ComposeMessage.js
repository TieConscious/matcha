import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { sendMessage, updateMessages, retrieveMessages } from "../actions/updateActions";
import io from "socket.io-client";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    margin: "1vh",
    alignSelf: "center"
  },
  formControl: {
    margin: "1vh",
    minWidth: 120
  }
};

export class ComposeMessage extends Component {
  constructor(props) {
    super(props);

    this.socket = io("localhost:5000");
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    conversations: PropTypes.array,
    currentConversation: PropTypes.object
  };

  state = {
    message: ""
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state.message);
    console.log(this.props.auth.user._id);
    console.log(this.props.currentConversation._id);
  };

  onSubmit = e => {
    //Grabs all info from settings with default values already set
    e.preventDefault();
    this.setState({ message: "" });

    const userID = this.props.auth.user._id;
    const conversationID = this.props.currentConversation._id;
    const message = this.state.message;

    const messageObject = {
      conversationID,
      userID,
      message
    };

    console.log(messageObject);
    this.props.sendMessage(messageObject);
    this.props.updateMessages(this.props.currentConversation._id);
    this.props.retrieveMessages(this.props.auth.user.conversations);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <TextField
            id="message"
            value={this.state.message}
            className={classes.textField}
            onChange={this.onChange}
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" variant="contained" className={classes.button}>
            SEND
          </Button>
        </form>
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
  { sendMessage, updateMessages, retrieveMessages }
)(withStyles(styles)(ComposeMessage));
