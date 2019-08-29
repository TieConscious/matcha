import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { validate } from "../actions/authActions";


class ValidateButton extends React.Component {
    
    handleClick = (e) => {
        this.props.validate(this.props.user._id)
        console.log(this.props.user._id);
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    onClick={this.handleClick}
                >
                    VALIDATE
                </Button>
            </>
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
    { validate }
  )((ValidateButton));