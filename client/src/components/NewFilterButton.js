import React from 'react';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CardExplore from './CardExplore';
import FilterSort from './FilterSort';
import ButtonFilter from './ButtonFilter';
import FilterButton from './FilterButton';
import SimpleSlider from './SimpleSlider';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


class NewFilterButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: false,
            drawerIsOpen: false,
            age: 18,
            location: 10,
            fameRate: 5,
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
        console.log(e.target);
        console.log(e.target.fame.value);
        //get it from state worst case scenario
    }

    render() {
        return (
            <>
            <button className="filter-button" onClick={this.handleDrawer}>Filter</button>
            <Drawer variant="temporary" open={this.state.drawerIsOpen}>
                <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                    <Typography id="label">Popularity</Typography>
                    <Slider
                        id="fame"
                        label="fame"
                        value={this.state.fameRate}
                        aria-labelledby="fameRate"
                        onChange={this.handleChange("fameRate")}
                        min={0}
                        max={42}
                        step={1}
                    />
                    <Typography id="label">Bald Tags</Typography>
                    <Slider
                        value={this.state.baldTags}
                        aria-labelledby="baldTags"
                        onChange={this.handleChange("baldTags")}
                        min="0"
                        max="4"
                        step="1"
                    />
                    <Typography id="label">Location (miles)</Typography>
                    <Slider
                        value={this.state.location}
                        aria-labelledby="location"
                        onChange={this.handleChange("location")}
                        min={0}
                        max={50}
                        step={2}
                    />
                    <button type="submit">Done</button>
                </form>
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
  )(NewFilterButton);