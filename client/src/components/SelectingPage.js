import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import rock from './resources/rock.jpg';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import SelectImage from './SelectImage.js';

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
  constructor(props) {
    super(props);
    this.state = {
      img1: false,
      img2: false,
      img3: false,
      img4: false,
      img5: false,
      img6: false
    }
  }

  handleSelect = (id) => {
    let imgId = "img" + id;
    console.log(this.state[imgId]);
    if (this.state[imgId]) {
      this.setState({
        [imgId]: false,
        });
    }
    else {
      this.setState({
        [imgId]: true,
        });
    }
      
    
    console.log(this.state[imgId]);
  }

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
        <SelectImage id="1" classForImage="select-pictures1" classSelected="select-pictures1 selected" handleSelect={this.handleSelect}/>
        <SelectImage id="2" classForImage="select-pictures2" classSelected="select-pictures2 selected" handleSelect={this.handleSelect}/>
        <SelectImage id="3" classForImage="select-pictures3" classSelected="select-pictures3 selected" handleSelect={this.handleSelect}/>
        <SelectImage id="4" classForImage="select-pictures4" classSelected="select-pictures4 selected" handleSelect={this.handleSelect}/>
        <SelectImage id="5" classForImage="select-pictures5" classSelected="select-pictures5 selected" handleSelect={this.handleSelect}/>
        <SelectImage id="6" classForImage="select-pictures6" classSelected="select-pictures6 selected" handleSelect={this.handleSelect}/>
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
