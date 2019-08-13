import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Geocode from "react-geocode";

import { loadUser } from "../actions/authActions";

import { geolocated } from "react-geolocated";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class Geo extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
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

  displayLocationInfo(position) {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;

    console.log(`longitude: ${ lng } | latitude: ${ lat }`);
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      error => {
        console.error(error);
      }
    );
  }

  onChange = e => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }
  };



  render() {
    console.log(this.props.auth);
    const { user } = this.props.auth;
    console.log(this.props.user.enableLocation); //
    return (
      // !this.props.isGeolocationAvailable ? (
      //   <div>Geolocation not supported</div>
      // ) : (
      <Checkbox
        checked={user.enableLocation}
        onChange={this.onChange}
        color="primary"
        value="checked"
      />
    );
    // !this.props.isGeolocationEnabled ? (
    //   <div>Geolocation is not enabled</div>
    // ) : this.props.coords ? (
    //   <table>
    //     <tbody>
    //       <tr>
    //         <td>latitude</td>
    //         <td>{this.props.coords.latitude}</td>
    //       </tr>
    //       <tr>
    //         <td>longitude</td>
    //         <td>{this.props.coords.longitude}</td>
    //       </tr>
    //       <tr>
    //         <td>altitude</td>
    //         <td>{this.props.coords.altitude}</td>
    //       </tr>
    //       <tr>
    //         <td>heading</td>
    //         <td>{this.props.coords.heading}</td>
    //       </tr>
    //       <tr>
    //         <td>speed</td>
    //         <td>{this.props.coords.speed}</td>
    //       </tr>
    //     </tbody>
    //   </table>
    // ) : (
    //   <div>Getting the location data&hellip; </div>
    // );
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
)(Geo);
// (geolocated()(Geo));
