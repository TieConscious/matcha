import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { updateImages } from "../actions/updateActions";


class ImageUploadButton extends React.Component {
    
    handleClick = (e) => {
        console.log(e.target.files);
        let reader = new FileReader();
        var dataURI;
        let callback = this.callbackForImage;
        reader.onload = function(e) {
            dataURI = e.target.result;
            console.log(dataURI);
            callback(dataURI);
        };
        reader.onerror = function(e) {
            console.log("ERROR: " + e.target.error.code)
        };

        reader.readAsDataURL(e.target.files[0]);
        

    }
    
    callbackForImage = (dataURI) => {
        this.props.updateImages(this.props.user._id, dataURI);
    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={this.handleClick}
                />
                <label htmlFor="raised-button-file">
                <Button
                    variant="contained"
                    component="span"
                    color="primary"
                >
                    upload image
                </Button>
                </label> 
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
    { updateImages }
  )((ImageUploadButton));