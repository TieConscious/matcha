import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { loadUser } from "../actions/authActions";

import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import profile from "../img/me.jpg";

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

class Dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
    this.props.loadUser();
  }

  componentDidUpdate() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;

    const dashboardDisplay = (
      <Fragment>
        <span className="navbar-text mr-3">
          <h3>
            <strong>{user ? `${user.firstname} ${user.lastname}` : ""}</strong>
          </h3>
          <h5>{user ? `${user.gender} ${user.age}` : ""}</h5>
          <h5>{user ? `${user.location}` : ""}</h5>
        </span>
      </Fragment>
    );

    const bioDisplay = (
      <Fragment>
        <span className="navbar-text mr-3">
          <h6>{user ? `${user.bio}` : ""}</h6>
        </span>
      </Fragment>
    );

    return (
      <Box className={classes.paper}>
        <Paper style={{ backgroundColor: "#FBFBFB" }}>
          <Grid container className={classes.root}>
            <Grid item xs={4}>
              <img
                className={classes.profile}
                src={profile}
                alt={"profile pic"}
              />
            </Grid>
            <Grid item xs={8}>
              {dashboardDisplay}
            </Grid>
            <Grid item xs={12}>
              {bioDisplay}
            </Grid>
            <Grid item xs={8}>
              <Paper>{user ? `Baldies: ${user.baldTags}` : ""}</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>asdf</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>{user ? `${user.images}` : ""}</Paper>
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
  error: state.error,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { loadUser }
)(withStyles(styles)(Dashboard));
