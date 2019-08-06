import React, { Component } from "react";
import rock from './resources/rock.jpg';
import { connect } from "react-redux";


class SelectImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        };
    }
    handleClick = () => {
        this.setState(state => ({
            isSelected: !state.isSelected,
            }));
        this.props.handleSelect(this.props.id);
    }

    render() {
    return (
        <>
            {this.state.isSelected ? <img className={this.props.classSelected} src={rock} onClick={this.handleClick}></img> :  <img className={this.props.classForImage} src={rock} onClick={this.handleClick}></img>}
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