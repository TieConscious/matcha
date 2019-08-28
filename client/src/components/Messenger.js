import React, { Component } from "react";

import MessengerSidebar from "./MessengerSidebar";
import MessengerChat from "./MessengerChat";
import { retrieveMessages } from "../actions/updateActions";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  messenger: {
    display: "grid",
    width: "100%",
    height: "100vh",
    background: "#eeeef1",

    gridTemplateColumns: `25vw auto`,
    gridTemplateRows: `60px' 'auto' '60px`,
    gridColumnGap: "1px",
    gridRowGap: "1px"
  },
  sidebar: {
    background: "white",
    gridRowStart: "1",
    gridRowEnd: "span 3",

    position: "relative",
    overflowY: "scroll"
    // -webkit-overflow-scrolling: "touch",
  },
  content: {
    background: "white",
    gridRowStart: "1",
    gridRowEnd: "span 3",

    position: "relative",
    overflowY: "scroll"
    // -webkit-overflow-scrolling: "touch",
  }
};

export class Messenger extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    conversations: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };
  }

  componentDidMount() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
    this.props.retrieveMessages(this.props.auth.user.conversations);
    // this.setState({ conversations: conversationsToState }, function() {
    //   console.log(this.state.conversations);
    // });
  }

  componentDidUpdate() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
    this.props.retrieveMessages(this.props.auth.user.conversations);
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.conversations);
    console.log(this.props.auth);

    return (
      <div className={classes.messenger}>
        <div className={classes.sidebar}>
          <MessengerSidebar />
        </div>
        <div className={classes.content}>
          <MessengerChat />
        </div>
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
  { retrieveMessages }
)(withStyles(styles)(Messenger));
