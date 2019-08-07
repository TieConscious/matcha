import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import rock from './resources/rock.jpg';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import SelectImage from './SelectImage.js';
var json = require('./resources/imagesInfo.json');


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
      imgStatus: [false, false, false, false, false, false],
      imgSrc: ['./resources/gray.jpg', './resources/gray.jpg', './resources/gray.jpg', './resources/gray.jpg', './resources/gray.jpg', './resources/gray.jpg'],
      imgName: [null, null, null, null, null, null]
    }
  }

  componentDidMount() {
    this.fillUp();
  }

  fillUp = () => {
    var numbersArray = [0, 0, 0, 0, 0, 0]
    var newnum = 0
    for (let i = 0; i < 6; i++) {
      var unique = false;
      while (unique == false) {
        unique = true;
        newnum = Math.floor((Math.random() * 11) + 1);
        for (let j = 0; j < i; j++) {
          if (newnum == numbersArray[j]) {
            unique = false;
          }
        }
      }
      numbersArray[i] = newnum;
    }
    var src1 = json[numbersArray[0]].url;
    var src2 = json[numbersArray[1]].url;
    var src3 = json[numbersArray[2]].url;
    var src4 = json[numbersArray[3]].url;
    var src5 = json[numbersArray[4]].url;
    var src6 = json[numbersArray[5]].url;
    var newSrc = this.state.imgSrc.slice();
    newSrc = [src1, src2, src3, src4, src5, src6];
    this.setState({ imgSrc: newSrc}, function() {
      console.log(this.state.imgSrc);
    });

  }

  handleSelect = (id) => {
    let imgId = "img" + id;
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
        <SelectImage id="1" src={this.state.imgSrc[0]} classForImage="select-pictures1" classSelected="select-pictures1 selected" handleSelect={this.handleSelect}/>
        <SelectImage id="2" src={this.state.imgSrc[1]} classForImage="select-pictures2" classSelected="select-pictures2 selected" handleSelect={this.handleSelect}/>
        <SelectImage id="3" src={this.state.imgSrc[2]} classForImage="select-pictures3" classSelected="select-pictures3 selected" handleSelect={this.handleSelect}/>
        <SelectImage id="4" src={this.state.imgSrc[3]} classForImage="select-pictures4" classSelected="select-pictures4 selected" handleSelect={this.handleSelect}/>
        <SelectImage id="5" src={this.state.imgSrc[4]} classForImage="select-pictures5" classSelected="select-pictures5 selected" handleSelect={this.handleSelect}/>
        <SelectImage id="6" src={this.state.imgSrc[5]} classForImage="select-pictures6" classSelected="select-pictures6 selected" handleSelect={this.handleSelect}/>
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
