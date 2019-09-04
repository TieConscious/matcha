import React, { Component } from "react";
import { connect } from "react-redux";



class SelectImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        };
    }

    componentDidMount() {
        console.log(this.props.src);
    }

    handleClick = () => {
        let selectedNumber = this.props.imgStatus.filter(v => v).length;
        if (selectedNumber >= 4) {
            if (this.state.isSelected) {
                this.setState(state => ({
                    isSelected: !state.isSelected,
                    }));
                this.props.handleSelect(this.props.id);
            }
            else {
                console.log("too much");
            }
            
        }
        else {
            this.setState(state => ({
                isSelected: !state.isSelected,
                }));
            this.props.handleSelect(this.props.id, this.props.imgName);
        }
        
    }

    render() {
        //const src = require('./resources/moo.jpg');
    return (
        <>
            {this.state.isSelected ? <img alt="this is a bald person" className={this.props.classSelected} src={require("" + this.props.src)} onClick={this.handleClick}></img> :  <img alt="this is a bald person" className={this.props.classForImage} src={require("" + this.props.src)} onClick={this.handleClick}></img>}
        </>
    );
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  null
)(SelectImage);