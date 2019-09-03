
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { forgotPassword, deleteTemp } from "../actions/updateActions";
import { sendEmail } from "../actions/authActions";
import { connect } from "react-redux";

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 4,
    },
  });

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email: ""
        }
      }
    
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    async forgot() {
        console.log("in forgot")
        let psswd = await this.props.forgotPassword(this.state.email);
        console.log("sowhat: " + psswd)
        return psswd
    }
    async handleSubmit(e) {
        e.preventDefault();
        // console.log(e.target.email.value);
        this.forgot()
    }
       

render() {
    const { classes } = this.props;
    if (this.props.temp != null) {
        console.log(this.props.temp)
        this.props.sendEmail(this.state.email, "retrieve password", "Please change your password ASAP. Use this temporary password: " + this.props.temp, 123456)
        this.props.deleteTemp();
    }
        
    return(
          <div className="forgot">
                <Paper>
                    <Typography variant="h5" color="primary" component="h3">
                    Retrieve Password
                    </Typography>
                    <Typography component="p">
                    Its easy
                    </Typography>
                    <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                        <TextField
                        id="email"
                        label="email"
                        placeholder="email"
                        onChange={this.handleChange('email')}
                        margin="normal"
                        />
                        <Button type="submit" variant="contained" color="secondary"> Send </Button>
                    </form>
                </Paper>
              </div>
    );
}
}

const mapStateToProps = state => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user,
    temp: state.auth.temp
  });
  
  export default connect(
    mapStateToProps,
    { forgotPassword, sendEmail, deleteTemp }
  )((ForgotPassword));