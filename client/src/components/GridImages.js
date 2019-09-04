import React from 'react';
import gray from './resources/gray.jpg';
import red from './resources/red.jpg'
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      margin: "1%",
    },
  });

class GridImages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: [gray, red, gray, red, gray, gray]
        }
    }
    render() {
        const { classes } = this.props;
        const images = (
            <Grid container>
                { this.props.user ?
                    this.props.user.media.map((item, key) => {
                        return  <Grid item key={key} xs={12} sm={6}> <img alt="this is a users" className="img-grid" src={item}></img></Grid>
                    })
                    :
                    this.state.imgSrc.map((item, key) => {
                        return  <Grid item key={key} xs={12} sm={6}> <img alt="this is a users" className="img-grid" src={item}></img></Grid>
                    })
                }
            </Grid>
        )
        return(
            <div className="Gallery">
                <div className={classes.root}>
                    {images}
                </div>
            </div>
        );
    }
}

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated,
//     user: state.auth.user,
//     error: state.error
//   });

  export default(withStyles(styles)(GridImages));
