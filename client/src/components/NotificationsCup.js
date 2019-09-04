import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import matcha from "../img/matcha.png";
import PropTypes from "prop-types";
import Badge from "@material-ui/core/Badge";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SnackBarNotification from "./SnackBarNotification";
import { getNotificationArray, updateNotifications, clearNotifications } from "../actions/updateActions";

export class NotificationCup extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    notificationsArray: PropTypes.array,
    notifications: PropTypes.array
  };

  state = {
    isOpen: false
  };

  // intervalID;

  componentDidMount() {
    // if (this.props.isAuthenticated) {
    //   this.props.updateNotifications(this.props.auth.user._id);
      // if (this.props.notifications !== [])
      //   this.props.getNotificationArray(this.props.notifications);
    // }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    if (this.props.notifications)
      this.props.getNotificationArray(this.props.notifications);
  };

  clearNotifications = () => {
    this.props.clearNotifications(this.props.auth.user._id);
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  notificationsReady = () => {
    if (this.props.user) {
      if (this.props.notifications) {
          return this.props.notifications.length;
      }
    }
    return 0;
  };

  matchNotificationSender = (notification) => {
    var sender;
    if (this.props.notificationsArray) {
      for (var i = 0; i < this.props.notificationsArray.length; i++) {
        if (notification.from === this.props.notificationsArray[i]._id) {
          sender = this.props.notificationsArray[i].firstname;
          return sender;
        }
      }
    }
    return ;
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    var notifications = this.notificationsReady();

    const authLinks = (
      <Fragment>
        <Badge
          onClick={this.toggle}
          badgeContent={notifications}
          color="secondary"
        >
          <img src={matcha} alt="mug" color="white" width="30" height="30" />
        </Badge>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          open={this.state.isOpen}
          onClose={this.toggle}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            notifications > 0
              ? this.props.notifications.map(
                  (notification, index) => (
                    <SnackBarNotification key={index} sender={this.matchNotificationSender(notification)} data={notification} />
                  )
                )
              : ""
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.clearNotifications}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Fragment>
    );

    const guestLinks = (
      <Badge>
        <img src={matcha} alt="mug" color="white" width="30" height="30" />
      </Badge>
    );

    return <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  notificationsArray: state.auth.notificationsArray,
  notifications: state.auth.notifications
});

export default connect(
  mapStateToProps,
  { getNotificationArray, updateNotifications, clearNotifications }
)(NotificationCup);
