import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
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
  static propTypes = {
    auth: PropTypes.object.isRequired,
    pmatches: PropTypes.array,
    user: PropTypes.object
  };

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

    shouldComponentUpdate(nextProps, nextState) {
      console.log("--------")
      console.log(this.props)
      console.log(nextProps)
      console.log("---------")
      if (this.props.pmatches !== nextProps.pmatches || this.props.user.likes !== nextProps.user.likes)
        return true
      else if (nextProps.auth.notifications.length === 0) {
        console.log(nextProps.auth.notifications.length)
        return false;
      } else {
        console.log(nextProps.auth.notifications)
        console.log("they are different")
        return true;
      }
    }

    componentDidUpdate() {
      // If not logged in and user navigates to Dashboard page, should redirect them to landing page
      if (!this.props.isAuthenticated) {
        this.props.history.push("/");
      }
    }

    componentDidMount() {
        if (!this.props.isAuthenticated) {
          this.props.history.push("/");
        }
        else {
          console.log(this.props.user);
          if (this.props.auth.user != null) {
              this.props.getMatches(this.props.auth.user.sexualPreference, this.props.user.gender, this.props.user.location);
          }
        }
    }

    compare = (a,b,min=2) => {
      let i = 0;
      let j = 0;
      let res = 0;
      while (i < a.length) {
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
      if (res >= min)
        return true;
      else
        return false;
    }

    filterMatches = () => {
      console.log(this.props.user);
      console.log(this.props.isAuthenticated);
      if (this.props.isAuthenticated === false) {
        this.props.history.push("/");
      }
      else {
        var filteredMatches = [];
        console.log(this.props.pmatches);
        this.props.pmatches.map(pmatch => {
          let res = this.compare(this.props.user.baldTags, pmatch.baldTags);
          console.log(pmatch.firstname);
          console.log("at least 2 tags:" + res);
          let liked = this.props.user.likes.includes(pmatch._id);
          let disliked = this.props.user.dislikes.includes(pmatch._id);
          let blocked = this.props.user.blocked.includes(pmatch._id)
          let same;
          if (this.props.user._id === pmatch._id)
            same = true;
          console.log("liked: " + liked + " disliked: " + disliked);
          if (!liked && !disliked && !same && !blocked && res)
            filteredMatches.push(pmatch);
          return (0);
        });
        if (this.props.user.location)
          filteredMatches.sort(((a) => (a.location === this.props.user.location) ? -1 : 1));
        console.log(filteredMatches);
        return (filteredMatches);
      }

    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    render() {
        console.log(this.props.user);
        if (this.props.isAuthenticated === false) {
          this.props.history.push("/");
        }
        return (
          <>
            <div className="wrapper">
                <div className="explore">
                    {this.props.isAuthenticated ?
                        this.props.pmatches ?
                        <Matches compare={this.compare} pfmatches={this.filterMatches()} />
                        : <h1> There's no one here for you </h1>
                        : <h1> There's no one here for you </h1>
                    }
                </div>
            </div>
          </>
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
