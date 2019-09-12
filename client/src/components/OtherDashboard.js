import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "../actions/authActions";
import { notifySeen } from "../actions/updateActions";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import profile from "../img/me.jpg";
import GridImages from './GridImages';
import OtherDashboardButtons from "./OtherDashboardButtons";

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

  constructor(props) {
      super(props);
      this.state = {
          user: null
      }
  }
  componentDidMount() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
    this.props.loadUser();
    console.log("-----")
    console.log(this.props.location.state.user);
    this.props.notifySeen(this.props.location.state.user._id, this.props.auth.user._id);
  }

  componentDidUpdate() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { classes } = this.props;
    const user = this.props.location.state.user;

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

    const profileDisplay = (
      <img
        className={classes.profile}
        src={user ? user.media[0] ? user.media[0] : profile : profile}
        alt={"profile pic"}
      />
    )

    const onlineDisplay = (
      <Paper style={{color: "#32CD32"	}}>online</Paper>
    )

    const offlineDisplay = (
        <Paper style={{color: "#A9A9A9	"	}}>offline: last login on {this.props.user ? this.props.user.lastLogin.slice(0, 16) : ""} </Paper>
    )
    return (
      <Box className={classes.paper}>
        <Paper style={{ backgroundColor: "#FBFBFB" }}>
          <Grid container className={classes.root}>
            <Grid item xs={4}>
              {profileDisplay}
            </Grid>
            <Grid item xs={8}>
              {dashboardDisplay}
            </Grid>
            <Grid item xs={12}>
              {bioDisplay}
            </Grid>
            <Grid item xs={8}>
              {user ? user.isOnline ? onlineDisplay : offlineDisplay : "offline"}
            </Grid>
            <Grid item xs={4}>
              <Paper>{user ? `Popularity: ${user.fameRate}` : ""}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>{user ? `Baldies: ${user.baldTags[0]} | ${user.baldTags[1]} | ${user.baldTags[2]} | ${user.baldTags[3]}` : ""}</Paper>
            </Grid>
          </Grid>
          <form noValidate autoComplete="off" />
        </Paper>
        <br />
        <OtherDashboardButtons info={user} />
        {user ? user.media ? <GridImages user={user} /> : "" : ""}
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
  { loadUser, notifySeen }
)(withStyles(styles)(Dashboard));
