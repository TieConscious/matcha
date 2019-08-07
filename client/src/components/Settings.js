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
    margin: "1vh",
    alignSelf: "center"
  },
  formControl: {
    margin: "1vh",
    minWidth: 120
  }
};

class Settings extends Component {
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
        <Paper style={{ backgroundColor: "#FBFBFB" }}>
          <Typography variant="h5" component="h3">
            Settings
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              label="first name"
              className={classes.textField}
              // value={values.name}
              // onChange={handleChange("name")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="last name"
              // defaultValue="foo"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="bio"
              multiline
              rowsMax="4"
              // defaultValue="foo"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            {/* <TextField
              label="password"
              // defaultValue="foo"
              type="password"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="confirm password"
              // defaultValue="foo"
              type="password"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            /> */}

            <TextField
              label="age"
              // value={values.age}
              // onChange={handleChange("age")}
              type="number"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-simple">gender</InputLabel>
              <Select>
                <MenuItem value={"male"}>male</MenuItem>
                <MenuItem value={"female"}>female</MenuItem>
                <MenuItem value={"other"}>other</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="age-simple">preference</InputLabel>
              <Select>
                <MenuItem value={"male"}>men</MenuItem>
                <MenuItem value={"female"}>women</MenuItem>
                <MenuItem value={"other"}>everyone</MenuItem>
              </Select>
            </FormControl>
            <br />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                component="span"
                className={classes.button}
              >
                upload image
              </Button>
            </label>
            <br />
            <Button variant="contained" className={classes.button}>
              Submit
            </Button>
          </form>
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
)(withStyles(styles)(Settings));
