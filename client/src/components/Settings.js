import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(10, 5000000)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function Settings() {
  const classes = useStyles();
  return (
    <div>
      Hello thar! moo gay
      <div>
        <Paper className="classes.paper">
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              // value={values.name}
              // onChange={handleChange("name")}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-uncontrolled"
              label="Uncontrolled"
              defaultValue="foo"
              // className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <div>
              <Button variant="contained" className={classes.button}>
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </div>
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
