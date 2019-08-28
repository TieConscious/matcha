import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "../actions/authActions";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { updateLike } from "../actions/updateActions";
import { updateFameRate } from "../actions/updateActions";


const styles = {
  button: {
    margin: "5%"
  }
};

class OtherDashboardButtons extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  constructor(props) {
      super(props);
      this.state = {
          user: null
      }
  }
  componentDidMount = () => {
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

  handleLike = () => {
    console.log("id of this: " + this.props.info._id);
    console.log("id of user: " + this.props.user._id);
    this.props.updateLike(this.props.info._id, "like", this.props.user._id);
    this.props.updateFameRate(this.props.info._id, "like");
  }
  render() {
    const { classes } = this.props;

    return (
      <Box className={classes.paper}>
        <Button
            className={classes.button}
            onClick={this.handleLike}
            variant="contained"
            component="span"
            color="primary"
        >
            LIKE
        </Button>
        <Button
            className={classes.button}
            variant="contained"
            component="span"
            color="secondary"
        >
            BLOCK
        </Button>
        <Button
            className={classes.button}
            variant="contained"
            component="span"
            color="contained"
        >
            REPORT
        </Button>
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
  { updateLike, updateFameRate, loadUser }
)(withStyles(styles)(OtherDashboardButtons));