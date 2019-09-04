import React, { Component } from "react";
import { connect } from "react-redux";
import { setConversation } from "../actions/updateActions";
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
    this.props.setConversation(this.props.data, this.props.sender);
  };

  render() {
    const { messages } = this.props.data;

    return (
      <div onClick={this.updateCurrentConversation}>
        {this.props.data
          ? messages.length > 0
            ? `${this.props.sender}\n${messages[messages.length - 1].message}`
            : `${this.props.sender}\n`
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
