import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
	root: {
	  flexGrow: 1,
	},
	paper: {
	  height: 140,
	  width: 100,
	},
	control: {
	  padding: theme.spacing(2),
	},
  }));

function Settings() {
	const classes = useStyles();
    return (
      <div>
        <Link to="/dashboard">Dashboard</Link>
        Hello thar! moo gay
        <Grid container>
          <form noValidate autoComplete="off">
            <Grid item>
              <TextField
                id="outlined-name"
                label="Name"
                className={classes.textField}
                // value={values.name}
                // onChange={handleChange("name")}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-uncontrolled"
                label="Uncontrolled"
                defaultValue="foo"
                // className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Button variant="contained">Submit</Button>
          </form>
        </Grid>
      </div>
    );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  null
)(Settings);
