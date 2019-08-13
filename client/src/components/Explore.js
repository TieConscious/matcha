import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardExplore from './CardExplore';
import { getMatches } from "../actions/authActions";
import Matches from './Matches';

// THE ISSUE IS TWO FOLD, EITHER I DONT HAVE THE INFO BC THE REDUCERS TAKES TIME TO GET IT
// OR IF I PUT IT IN COMPONENT DID UPDATE THEN IT TIMES OUT
// WHAT IS THE SOLUTION? FIND OUT IN THE NEXT DRAGON BALL Z

const styles = {
  paper: {
    flex: "1",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "40vh",
    margin: "auto",
    paddingTop: "5vh"
  },
  button: {
    margin: "10px"
  },
  textField: {
    margin: "auto"
  },
  profile: {
    height: '100px',
    borderRadius: '50%'
  },
  card: {
    maxWidth: 345,
  }
};

class Explore extends Component {
    constructor(props){
        super(props);
        this.state = {
            pmatches: [
                {
                    "name": "aren",
                    "lastname": "windham",
                    "media": ["./resources/jordan.jpg", ""],
                    "bio": "Im lonely"
                },
                {
                    "name": "moo",
                    "lastname": "sashi",
                    "media": ["./resources/moo.jpg", ""],
                    "bio": "Im lonely"
                }
            ]
        }
    }
    componentDidMount() {
        console.log(this.props.user);
        if (this.props.user != null) {
            this.props.getMatches(this.props.user.sexualPreference, this.props.user.gender, this.props.user.location);
        }
    }

    compare = (a,b) => {
      console.log("a: " + a);
      console.log("b: " + b);
      let i = 0;
      let j = 0;
      let res = 0;
      while (i < a.length) {
        console.log(a[i]);
        j = 0;
        while (j < b.length) {
          let inc = a[i].includes(b[j]);
          if (inc) {
            res++;
          }
          j++;
        }
        i++;
      }
      if (res >= 2)
        return true;
      else 
        return false;
    }

    filterMatches = () => {
      var filteredMatches = [];
      this.props.pmatches.map(pmatch => {
        let res = this.compare(this.props.user.baldTags, pmatch.baldTags);
        console.log(pmatch.firstname);
        console.log(res);
        let liked = this.props.user.likes.includes(pmatch._id);
        let disliked = this.props.user.dislikes.includes(pmatch._id);
        let same;
        if (this.props.user._id == pmatch._id)
          same = true;
        console.log("liked: " + liked + " disliked: " + disliked);
        if (!liked && !disliked && !same && res)
          filteredMatches.push(pmatch);
      });
      console.log(filteredMatches);
      return (filteredMatches);
    }
    
    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    render() {
        console.log(this.props.user);
        // if (this.props.user != null) {
        //     this.updateMatches();
        // };
        const { classes } = this.props;
        return (
            <div className="wrapper">
                <div className="explore">
                    {   this.props.pmatches ? 
                        <Matches pfmatches={this.filterMatches()} />
                        : <h1> There's no one here for you </h1>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  user: state.auth.user,
  pmatches: state.auth.pmatches
});

export default connect(
  mapStateToProps,
  { getMatches }
)(withStyles(styles)(Explore));