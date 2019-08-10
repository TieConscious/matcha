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

const styles = {
  card: {
    maxWidth: 305,
    maxHeight: 3400,
    marginTop: 15
  },
};

class CardExplore extends React.Component {
    render() {
        // console.log("INFOOOOOO: " + this.props.info.images);
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
              <CardActionArea>
              <img className="cardImage" src={this.props.info.media[0]} onClick={this.handleClick}></img>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {this.props.info.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {this.props.info.bio}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="cardButtons">
                <Button size="small" color="primary">
                  LIKE
                </Button>
                <Button size="small" color="primary">
                  REPORT
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
    null
  )(withStyles(styles)(CardExplore));