import React from 'react';
import { connect } from "react-redux";
import CardExplore from './CardExplore';
import FilterSort from './FilterSort';
import NewFilterButton from './NewFilterButton';



class Matches extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: null,
            sort: null
        }
    }
    componentDidMount() {
        if (!this.props.isAuthenticated) {
            this.props.history.push("/");
          }
    }
    componentDidUpdate() {
        if (!this.props.isAuthenticated) {
            this.props.history.push("/");
          }
    }
    handleFilters = (filters) => {
        this.setState({filters: filters, sort: null}, function() {
            console.log(this.state.filters);
        });
    }
    handleSort = (value) => {
        this.setState({sort: value, filters: null}, function() {
            console.log(this.state.sort);
        });
        if (value == "age")
            this.props.pfmatches.sort(((a, b) => (a.age > b.age) ? 1 : -1));
        else if (value == "baldTags") {
             this.props.pfmatches.map(item => {
                this.compare(this.props.user.baldTags, item.baldTags, item);
              });
            this.props.pfmatches.sort(((a, b) => (a.noBald > b.noBald) ? -1 : 1));
        }
        else if (value == "fameRate") {
            this.props.pfmatches.sort(((a, b) => (a.fameRate > b.fameRate) ? -1 : 1));
        }
    }

    filterBaldTags = () => {
        this.props.pfmatches.map(item => {
           this.compare(this.props.user.baldTags, item.baldTags, item);
         });
       this.props.pfmatches.sort(((a, b) => (a.noBald > b.noBald) ? -1 : 1));
    }
    compare = (a,b,item) => {
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
        item.noBald = res;
     }
    render() {
        return (
            <>
            <div className="filterbuttons">
                <FilterSort handleSort={this.handleSort} />
                <NewFilterButton handleFilters={this.handleFilters} />
            </div>
            {this.state.sort ? this.props.pfmatches.map(pfmatch => {
                return <CardExplore info={pfmatch} />
            })
            :
            this.props.pfmatches.map(pfmatch => {
                console.log(pfmatch);
                if (this.state.filters != null) {
                    //add baldTags, location, popularity,
                    this.filterBaldTags();
                    console.log("baldTagsFilter: " +this.state.filters.baldTags+" pmatch.noBaldTags: "+pfmatch.noBaldTags);
                    if ((pfmatch.age >= this.state.filters.age[0] && pfmatch.age <= this.state.filters.age[1]) && (pfmatch.noBald >= this.state.filters.baldTags) && (pfmatch.fameRate >= this.state.filters.fameRate)) {
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