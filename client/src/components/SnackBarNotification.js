import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  paper: {}
};

export class SnackBarNotification extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  notificationMessage = (notificationType, notifier) => {
    if (notificationType === "like")
      return "Liked by " + notifier + "!";
    else if (notificationType === "match")
      return "Matched with " + notifier + "!";
    else if (notificationType === "message")
      return "New message from " + notifier + "!";
    else if (notificationType === "viewed")
      return "Viewed by " + notifier + "!";
    return "notification";
  };

  render() {
	const { notificationType } = this.props.data;

    return (
      <div>
        {this.props.data ? this.props.sender != null ? this.notificationMessage(notificationType, this.props.sender) : "" : ""}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  otherUser: state.auth.otherUser
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(SnackBarNotification));
