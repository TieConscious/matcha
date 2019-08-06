import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import profile from '../img/me.jpg';

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
  }
};

class Dashboard extends Component {
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

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;
    const { isAuthenticated, user } = this.props.auth;

    const dashboardDisplay = (
      <Fragment>
        <span className="navbar-text mr-3">
          <strong>{user ? `${user.firstname} ${user.lastname}` : ""}</strong>
        </span>
      </Fragment>
    );

    return (
      <Box className={classes.paper}>
        <Paper style={{ backgroundColor: "#FBFBFB" }}>
          <Grid container className={classes.root}>
            <Grid item xs={4}>
              <img src={profile} alt={'profile pic'} />
            </Grid>
            <Grid item xs={8}>
              <Paper>asdf</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>asdf</Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper>asdf</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>asdf</Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper>asdf</Paper>
            </Grid>
          </Grid>
          <form noValidate autoComplete="off" />
        </Paper>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Dashboard));
