import React from 'react';
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CardExplore from './CardExplore';
import FilterSort from './FilterSort';
import ButtonFilter from './ButtonFilter';
import FilterButton from './FilterButton';



class Matches extends React.Component {
    
    render() {
        return (
            <>
            <div className="filterbuttons">
                <FilterSort />
                <FilterButton />
            </div>
            {this.props.pfmatches.map(pfmatch => {
                return <CardExplore info={pfmatch} />
            })}
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
  )(Matches);