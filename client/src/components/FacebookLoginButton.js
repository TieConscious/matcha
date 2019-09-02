import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { register } from "../actions/authActions";
import { connect } from "react-redux";

class FacebookLoginButton extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        email: '',
        picture: ''
    }
    componentClicked = () => {
        console.log('clicked');
    }
    responseFacebook = (response) => {
        console.log(response);
        const nameOfNewUser = response.name.split(" ");
        const firstname = nameOfNewUser[0];
        const lastname = nameOfNewUser[1];
        const newUser = {
            firstname: firstname,
            lastname: lastname,
            email: response.email,
            password: response.userID
          };
      
        this.getItDone(newUser);
    }
    async getItDone(newUser) {
        let result = await this.props.register(newUser);
        let loginUser = {
            email: newUser.email,
            password: newUser.password,
            fb: 1
        }
        this.props.login(loginUser);
    }
    render() {
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = null
        }
        else {
            fbContent = (
                <FacebookLogin
                appId="2359336114104046"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />)
        }
        return (
            <div>
                {fbContent}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  });
  
  export default connect(
    mapStateToProps,
    { register, clearErrors, login }
  )(FacebookLoginButton);