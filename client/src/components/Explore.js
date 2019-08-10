import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardExplore from './CardExplore';
import { getMatches } from "../actions/authActions";

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
        this.updateMatches();
    }

    updateMatches = () => {
        console.log("UPDATINGGGGG");
        let newPmatches = this.props.pmatches;
        console.log("newPMATCHES: " + newPmatches);
        // this.setState({pmatches: newPmatches}, function() {
        //     console.log("matches: " + this.state.pmatches);
        // })
    }
    componentDidUpdate() {
        // console.log(this.props.pmatches);
        // let newPmatches = this.props.pmatches;
        // this.setState({pmatches: newPmatches}, function() {
        //     console.log("matches: " + this.state.pmatches);
        // })
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    render() {
        console.log(this.props.pmatches);
        const { classes } = this.props;
        return (
            <div className="wrapper">
                <div className="explore">
                    {
                        this.state.pmatches.map(pmatch => {
                            return <CardExplore info={pmatch} />
                        })
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