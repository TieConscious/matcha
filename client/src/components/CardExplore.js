import React from 'react';
import Card from '@material-ui/core/Card';
import { connect } from "react-redux";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import { updateLike } from "../actions/updateActions";
import { updateFameRate } from "../actions/updateActions";
import { Link } from "react-router-dom";

const styles = {
  card: {
    maxWidth: 305,
    maxHeight: 3400,
    marginTop: 15
  },
};

class CardExplore extends React.Component {

  componentDidMount() {
    console.log(this.props.info);
  }

  handleClick = () =>{
    // console.log("click handled" + this.props.info._id)

  }

  handleClickLike = () => {
      if (this.props.user.media.length > 0) {
        console.log("user " + this.props.user._id + " likes user " + this.props.info._id);
        this.props.updateLike(this.props.info._id, "like", this.props.user._id);
        this.props.updateFameRate(this.props.info._id, "like");
      }
      else
        alert("You need to upload a picture to like someone else!")

  }

  handleClickDislike = () => {
    console.log("DISlike");
    this.props.updateLike(this.props.info._id, "dislike", this.props.user._id);
    this.props.updateFameRate(this.props.info._id, "dislike");
  }

    render() {
        // console.log("INFOOOOOO: " + this.props.info.images);
        const { classes } = this.props;
        console.log(this.props.user);
        console.log(this.props.info);
        return (
            <Card className={classes.card}>
              <CardActionArea>
              <img alt="this is a users profile" className="cardImage" src={this.props.info.media[0]} ></img>
                <CardContent>
                  <Link to={{
                    pathname: "user/" + this.props.info._id,
                    state: {
                      user: this.props.info
                    }
                  }}>
                  <Typography gutterBottom variant="h5" component="h2" onClick={this.handleClick}>
                    {this.props.info.firstname}
                  </Typography>
                  </Link>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {this.props.info.bio}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="cardButtons">
                <Button size="small" onClick={this.handleClickLike} color="primary">
                  LIKE
                </Button>
                <Button size="small" onClick={this.handleClickDislike}color="primary">
                  DISLIKE
                </Button>
              </CardActions>
            </Card>
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
    { updateLike, updateFameRate }
  )(withStyles(styles)(CardExplore));
