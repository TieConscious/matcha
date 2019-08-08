import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateSettings } from "../actions/updateActions";

import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";

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
  state = {
    firstname: "",
    lastname: "",
    bio: "",
    age: ""
  };

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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { firstname, lastname, bio, age } = this.state;

    const newSettings = {
      firstname,
      lastname,
      bio,
      age
    };

    this.props.updateSettings(newSettings, this.props.user._id);
  };

  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;

    return (
      <Box className={classes.paper}>
        <Paper style={{ backgroundColor: "#FBFBFB" }}>
          <Typography variant="h5" component="h3">
            Settings
          </Typography>
          <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
            <TextField
              label="first name"
              className={classes.textField}
              defaultValue={user ? `${user.firstname}` : ""}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="last name"
              className={classes.textField}
              defaultValue={user ? `${user.lastname}` : ""}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="bio"
              multiline
              rowsMax="4"
              className={classes.textField}
              defaultValue={user ? `${user.bio}` : ""}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="age"
              type="number"
              className={classes.textField}
              defaultValue={user ? `${user.age}` : ""}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
            />
            {/* <br />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel>gender</InputLabel>
              <Select variant="outlined" onChange={this.onChange} defaultValue={user ? `${user.gender}` : ""}>
                <MenuItem value={"male"}>male</MenuItem>
                <MenuItem value={"female"}>female</MenuItem>
                <MenuItem value={"other"}>other</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl} autoComplete="off">
              <InputLabel htmlFor="sexualPreference">preference</InputLabel>
              <Select
                variant="outlined"
                onChange={this.onChange}
                defaultValue={user ? `${user.sexualPreference}` : ""}

              >
                <MenuItem value={"male"}>men</MenuItem>
                <MenuItem value={"female"}>women</MenuItem>
                <MenuItem value={"other"}>everyone</MenuItem>
              </Select>
            </FormControl>
            <br /> */}
            {/* <input
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
            </label> */}
            <br />
            <Button type="submit" variant="contained" className={classes.button}>
              Submit
            </Button>
          </form>
        </Paper>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { updateSettings }
)(withStyles(styles)(Settings));
