import React, { Component } from "react";

import MessengerSidebar from "./MessengerSidebar";
import MessengerChat from "./MessengerChat";

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
    gridRowGap: "1px",
  },
  sidebar: {
    background: "white",
    gridRowStart: "1",
    gridRowEnd: "span 3",

    position: "relative",
    overflowY: "scroll",
    // -webkit-overflow-scrolling: "touch",
  },
  content: {
    background: "white",
    gridRowStart: "1",
    gridRowEnd: "span 3",

    position: "relative",
    overflowY: "scroll",
    // -webkit-overflow-scrolling: "touch",
  }
};

export class Messenger extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { classes } = this.props;

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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Messenger));
