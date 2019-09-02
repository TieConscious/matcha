import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Geocode from "react-geocode";

import { updateSettings } from "../actions/updateActions";
import { loadUser } from "../actions/authActions";

import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

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
  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  state = {
    firstname: this.props.user.firstname,
    lastname: this.props.user.lastname,
    bio: this.props.user.bio,
    age: this.props.user.age,
    gender: this.props.user.gender,
    sexualPreference: this.props.user.sexualPreference,
    location: this.props.user.location
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

  displayLocationInfo = (position) => {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;

    var res = "";
    var here = this;
    Geocode.fromLatLng(lat, lng)
    .then(
      response => {
        var address = response.results[0].address_components[2].long_name + ", " + response.results[0].address_components[4].short_name + ", " + response.results[0].address_components[5].short_name;
        res = address;
        this.setState({location: res}, function() {
          console.log(this.state);
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  handleLocationError = () => {
    fetch('http://ip-api.com/json')
      .then(res => res.text(),
        error => {
          console.error(error);
        }
      )
      .then(data => {
        var userData = JSON.parse(data);
        var address = userData.city + ", " + userData.region + ", " + userData.countryCode;
        this.setState({location: address}, function() {
          console.log(this.state)
        });
      });
  }

  geoLocator = e => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo, this.handleLocationError);
    }
    else {
      this.handleLocationError()
    }
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeSelect = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    //Grabs all info from settings with default values already set
    e.preventDefault();

    const id = this.props.user._id;
    const { firstname, lastname, bio, age, gender, sexualPreference, location } = this.state;

    const user = {
      firstname, lastname, bio, age, gender, sexualPreference, location, id
    };
    //On successful submission redirect
    this.props.updateSettings(user);
    this.props.history.push("/dashboard");
  };

  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;
    const location = (
      <Button type="button" id="location" variant="outlined" onClick={this.geoLocator} className={classes.button}>
        enable location
      </Button>
    );
    const locationChange = (
      <TextField
        id="location"
        label="change location"
        className={classes.textField}
        defaultValue={user ? `${user.location}` : ""}
        onChange={this.onChange}
        margin="normal"
        variant="outlined"
      />
    )
    return (
      <Box className={classes.paper}>
        <Paper style={{ backgroundColor: "#FBFBFB" }}>
          <Typography variant="h5" component="h3">
            Settings
          </Typography>
          <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
            <TextField
              id="firstname"
              label="first name"
              className={classes.textField}
              defaultValue={user ? `${user.firstname}` : ""}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="lastname"
              label="last name"
              className={classes.textField}
              defaultValue={user ? `${user.lastname}` : ""}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="bio"
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
              id="age"
              label="age"
              type="number"
              className={classes.textField}
              defaultValue={user ? `${user.age}` : ""}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
            />
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="gender">gender</InputLabel>
              <Select
                value={this.state.gender}
                onChange={this.onChangeSelect}
                inputProps={{
                  name: 'gender',
                  id: 'gender'
                }}
              >
                <MenuItem value={"male"}>male</MenuItem>
                <MenuItem value={"female"}>female</MenuItem>
                <MenuItem value={"other"}>other</MenuItem>
              </Select>
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="sexualPreference">sexualPreference</InputLabel>
              <Select
                value={this.state.sexualPreference}
                onChange={this.onChangeSelect}
                inputProps={{
                  name: 'sexualPreference',
                  id: 'sexualPreference'
                }}
              >
                <MenuItem value={"male"}>male</MenuItem>
                <MenuItem value={"female"}>female</MenuItem>
                <MenuItem value={"other"}>everyone</MenuItem>
              </Select>
            </FormControl>
            <br />
              {this.props.user ? this.props.user.location.length > 0 ? locationChange : location : location}
            <br />
            <Button type="submit" variant="contained" className={classes.button}>
              SUBMIT
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
  { updateSettings, loadUser }
)(withStyles(styles)(Settings));
