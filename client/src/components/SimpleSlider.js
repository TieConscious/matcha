import React from 'react';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


class SimpleSlider extends React.Component {
    state = {
      slider1: 50,
      slider2: 50
    };
  
    handleChange = name => (e, value) => {
      this.setState({
        [name]: value // --> Important bit here: This is how you set the value of sliders
      }, function() {
          console.log(this.state);
      });
    };
  
    render() {
      const { classes } = this.props;
      const { slider1, slider2 } = this.state;
  
      return (
        <div>
          <Typography id="label">Slider label</Typography>
          <Slider
            value={slider1}
            aria-labelledby="label"
            onChange={this.handleChange("slider1")}
          />
          <Slider
            value={slider2}
            aria-labelledby="label"
            onChange={this.handleChange("slider2")}
          />
        </div>
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
    null
  )(SimpleSlider);