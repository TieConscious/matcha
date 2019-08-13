import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { connect } from "react-redux";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import { updateLike } from "../actions/updateActions";

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
    handleClickLike = () => {
       console.log("user " + this.props.user._id + " likes user " + this.props.info._id);
       this.props.updateLike(this.props.info._id, "like", this.props.user._id);
    }

    handleClickDislike = () => {
      console.log("DISlike");
      this.props.updateLike(this.props.info._id, "dislike", this.props.user._id);
  }

    render() {
        // console.log("INFOOOOOO: " + this.props.info.images);
        const { classes } = this.props;
        console.log(this.props.user);
        console.log(this.props.info);
        return (
            <Card className={classes.card}>
              <CardActionArea>
              <img className="cardImage" src={this.props.info.media[0]} onClick={this.handleClick}></img>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {this.props.info.firstname}
                  </Typography>
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
    { updateLike }
  )(withStyles(styles)(CardExplore));