import React, { Component } from "react";

import { connect } from "react-redux";
import { sendMessage, updateMessage, retrieveMessages } from "../actions/updateActions";


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
    marginBottom: "50px"
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
    this.props.sendMessage(conversationID, userID, message);
    // this.props.updateMessage(this.props.currentConversation._id);
    // this.props.retrieveMessages(this.props.auth.user.conversations);
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
  { sendMessage, updateMessage, retrieveMessages }
)(withStyles(styles)(ComposeMessage));
