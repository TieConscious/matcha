import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "../actions/authActions";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
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
    };
  }
  componentDidMount = () => {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
    this.props.loadUser();
  };

  componentDidUpdate() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  handleLike = () => {
    this.props.updateLike(this.props.info._id, "like", this.props.user._id);
    this.props.updateFameRate(this.props.info._id, "like");
  };

  handleDislike = () => {
    this.props.updateLike(this.props.info._id, "dislike", this.props.user._id);
    this.props.updateFameRate(this.props.info._id, "dislike");
  };

  handleBlock = () => {
    this.props.updateLike(this.props.info._id, "block", this.props.user._id);
  };
  handleReport = () => {
    alert("User: " + this.props.info.firstname + " reported for being bad");
  };
  render() {
    const { classes } = this.props;
    const displayLike = (
      <Button
        className={classes.button}
        onClick={this.handleLike}
        variant="contained"
        component="span"
        color="primary"
      >
        LIKE
      </Button>
    );
    const displayUnlike = (
      <Button
        className={classes.button}
        onClick={this.handleDislike}
        variant="contained"
        component="span"
        color="primary"
      >
        UNLIKE
      </Button>
    );

    const displayBlock = (
      <Button
        className={classes.button}
        variant="contained"
        component="span"
        color="secondary"
        onClick={this.handleBlock}
      >
        BLOCK
      </Button>
    );
    return (
      <Box className={classes.paper}>
        {this.props.user.blocked.includes(this.props.info._id)
          ? ""
          : this.props.user.likes.includes(this.props.info._id)
          ? displayUnlike
          : displayLike}
        {this.props.user.blocked.includes(this.props.info._id) ? (
          <h2>USER IS BLOCKED</h2>
        ) : (
          displayBlock
        )}
        <Button
          className={classes.button}
          variant="contained"
          component="span"
          onClick={this.handleReport}
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
