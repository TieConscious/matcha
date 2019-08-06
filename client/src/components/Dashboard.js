import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    width: "40vh",
    margin: "auto"
  },
  button: {
    margin: "10px"
  },
  textField: {
    margin: "1vh"
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

  render() {
    const { classes } = this.props;

    return (
      <Box className={classes.paper}>
        <Paper>
          <Typography variant="h5" color="primary" component="h3">
            --first and last name--
          </Typography>
          <Grid container className={classes.root}>
            <Grid item xs={6}>asdf</Grid>
            <Grid item xs={6}>asdf</Grid>
            <Grid item xs={6}>asdf</Grid>
            <Grid item xs={6}>asdf</Grid>
          </Grid>
          <form noValidate autoComplete="off" />
        </Paper>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Dashboard));
