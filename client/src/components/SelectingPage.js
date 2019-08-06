import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import rock from './resources/rock.jpg';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

const styles = {
	paper: {
	  width: "40vh",
	  margin: "auto"
	},
	button: {
    margin: "10px",
    backgroundColor: "#A4DDB0",
	},
	textField: {
	  margin: "1vh"
	}
  };

class SelectingPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="select">
        <div className="select-title">
          <Typography variant="subtitle1" color="primary" align="center" component="h5">
          Select 5 of your favorite bald celebrities
          </Typography>
          <Typography variant="subtitle2" align="center" color="secondary">
          Your match will be determine by this so choose wisely. Pleaaaaase.
          </Typography>
        </div>
        <img className="select-pictures1" src={rock}></img>
        <img className="select-pictures2" src={rock}></img>
        <img className="select-pictures3" src={rock}></img>
        <img className="select-pictures4" src={rock}></img>
        <img className="select-pictures5" src={rock}></img>
        <img className="select-pictures6" src={rock}></img>
        <Button color="primary" size="medium" className={classes.button}>
          Done
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(SelectingPage));