import React from 'react';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel } from '@material-ui/core';

const styles = {
    list: {
        width: 360,
        paddingLeft: 10,
        paddingRight: 10,
      },
      fullList: {
        width: 'auto',
      },
}

class NewFilterButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: false,
            drawerIsOpen: false,
            age: [18, 47],
            location: false,
            fameRate: [0,5],
            baldTags: 2,
        };
    }
    handleDrawer = () => {
        this.setState({drawerIsOpen: !this.state.drawerIsOpen});
    }

    handleChange = name => (e, value) => {
        this.setState({
          [name]: value // --> Important bit here: This is how you set the value of sliders
        }, function() {
            console.log(this.state);
        });
      };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({drawerIsOpen: false});
        console.log(e.target);
        console.log(this.state);
        const filters = {
            age: this.state.age,
            location: this.state.location,
            fameRate: this.state.fameRate,
            baldTags: this.state.baldTags

        }
        this.props.handleFilters(filters);
        //get it from state worst case scenario
    }

    render() {
        return (
            <>
            <button className="filter-button" onClick={this.handleDrawer}>Filter</button>
            <Drawer  variant="temporary" open={this.state.drawerIsOpen}>
                <div className="drawerInner">
                    <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                        <Typography id="label">Age range</Typography>
                        <Slider
                            id="age"
                            label="age"
                            value={this.state.age}
                            onChange={this.handleChange("age")}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={18}
                            max={50}
                            step={1}
                        />
                        <Typography id="label">Popularity</Typography>
                        <Slider
                            id="fame"
                            label="fame"
                            value={this.state.fameRate}
                            aria-labelledby="fameRate"
                            onChange={this.handleChange("fameRate")}
                            min={0}
                            max={10}
                            step={1}
                            valueLabelDisplay="auto"
                        />
                        <Typography id="label">Bald Tags</Typography>
                        <Slider
                            value={this.state.baldTags}
                            aria-labelledby="baldTags"
                            onChange={this.handleChange("baldTags")}
                            min="0"
                            max="4"
                            step="1"
                            valueLabelDisplay="auto"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                checked={this.state.location}
                                onChange={this.handleChange("location")}
                                value={this.state.location}
                                indeterminate
                                />
                            }
                            label="Location"
                        />
                        <Button color="secondary" type="submit">Done</Button>
                    </form>
                </div>
            </Drawer>
            </>
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
  )(withStyles(styles)(NewFilterButton));