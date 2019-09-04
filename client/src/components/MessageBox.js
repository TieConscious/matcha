import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  paper: {}
};

export class MessengerBox extends Component {
  render() {
    return (
      <div>
        {this.props.user && this.props.message
            ? `${this.props.user}: ${this.props.message}\n`
            : `${this.props.message}\n`
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(MessengerBox));
