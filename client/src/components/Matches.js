import React from 'react';
import { connect } from "react-redux";
import CardExplore from './CardExplore';
import FilterSort from './FilterSort';
import NewFilterButton from './NewFilterButton';



class Matches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: null
        }
    }
    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push("/");
          }
    }
    componentDidUpdate() {
        console.log("component updated");
        if (!this.props.isAuthenticated) {
            this.props.history.push("/");
          }
    }
    handleFilters = (filters) => {
        console.log(filters);
        this.setState({filters: filters}, function() {
            console.log(this.state.filters);
        });
    }
    render() {
        return (
            <>
            <div className="filterbuttons">
                <FilterSort />
                <NewFilterButton handleFilters={this.handleFilters} />
            </div>
            {this.props.pfmatches.map(pfmatch => {
                console.log(pfmatch);
                if (this.state.filters != null) {
                    //add baldTags, location, popularity, 
                    if (pfmatch.age >= this.state.filters.age[0] && pfmatch.age <= this.state.filters.age[1]) {
                        console.log("match filtered");
                        return <CardExplore info={pfmatch} />
                    }     
                }
                else {
                    return <CardExplore info={pfmatch} />
                }
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