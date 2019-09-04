import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { login } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { register } from "../actions/authActions";
import { connect } from "react-redux";
import { updateImagesFB } from "../actions/updateActions";

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
        if (response.status !== "unknown")
        {
            const nameOfNewUser = response.name.split(" ");
            const firstname = nameOfNewUser[0];
            const lastname = nameOfNewUser[1];
            const newUser = {
                firstname: firstname,
                lastname: lastname,
                email: response.email,
                password: response.userID
            };
            this.setState({
                userID: response.userID,
                email: response.email
            })
            this.getItDone(newUser, response.userID)
        }
        
    }
    async getItDone(newUser, fbID) {
        await this.props.register(newUser);
        let loginUser = {
            email: newUser.email,
            password: newUser.password,
            fb: 1
        }
        await this.props.login(loginUser);
        return 1;
    }

    // async call(email, fbID) {
    //     console.log("calling...")
    //     console.log(fbID)
    //     axios.get("https://graph.facebook.com/" + fbID + "/picture?type=large&width=720&height=720&redirect=0", {headers: {'Content-Type': 'application/json'}})
    //     .then(response => {
    //         console.log(response)
    //         console.log(response.data.data.url);
    //         this.props.updateImagesFB(email, response.config.url)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }
    render() {
        let fbContent;
        if (this.state.isLoggedIn) {
            fbContent = null
        }
        else {
            fbContent = (
                <FacebookLogin 
                style={{ marginTop: "1.5rem"}}
                appId="2359336114104046"
                autoLoad={false}
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
    error: state.error,
    user: state.auth.user
  });
  
  export default connect(
    mapStateToProps,
    { register, clearErrors, login, updateImagesFB }
  )(FacebookLoginButton);