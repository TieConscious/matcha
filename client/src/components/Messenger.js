import React, { Component } from "react";
import MessengerSidebar from "./MessengerSidebar";
import MessengerChat from "./MessengerChat";
import { retrieveMessages, updateMessage, getChattersArray } from "../actions/updateActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  messenger: {
    display: "grid",
    width: "100%",
    height: "100vh",
    background: "#eeeef1",

    gridTemplateColumns: `25vw auto`,
    gridTemplateRows: `60px' 'auto' '60px`,
    gridColumnGap: "1px",
    gridRowGap: "1px"
  },
  sidebar: {
    background: "white",
    gridRowStart: "1",
    gridRowEnd: "span 3",

    position: "relative",
    overflowY: "scroll"
    // -webkit-overflow-scrolling: "touch",
  },
  content: {
    background: "white",
    gridRowStart: "1",
    gridRowEnd: "span 3",

    position: "relative",
    overflowY: "scroll"
    // -webkit-overflow-scrolling: "touch",
  }
};

export class Messenger extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    conversations: PropTypes.array,
    currentConversation: PropTypes.object
  };

  intervalID;

  componentDidMount() {
    // If not logged in and user navigates to Dashboard page, should redirect them to landing page
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
    if (this.props.auth.user != null)
      this.props.retrieveMessages(this.props.auth.user.conversations);
    this.intervalID = setInterval(this.getData.bind(this), 3000);
    if (this.props.currentConversation != null) {
      this.props.updateMessage(this.props.currentConversation._id);
    }
    if (this.props.conversations && this.props.conversations !== []) {
      console.log(this.props.conversations);
      this.props.getChattersArray(this.props.conversations);
    }
  }

  componentDidUpdate() {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  getData = () => {
    if (this.props.isAuthenticated) {
      this.props.retrieveMessages(this.props.auth.user.conversations);
      if (this.props.currentConversation != null) {
        this.props.updateMessage(this.props.currentConversation._id);
      }
      if (this.props.conversations && this.props.conversations !== []) {
        console.log(this.props.conversations);
        this.props.getChattersArray(this.props.conversations);
      }
    }
    
  };

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.messenger}>
        <div className={classes.sidebar}>
          <MessengerSidebar />
        </div>
        <div className={classes.content}>
          <MessengerChat />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  conversations: state.auth.conversations,
  currentConversation: state.auth.currentConversation
});

export default connect(
  mapStateToProps,
  { retrieveMessages, updateMessage, getChattersArray }
)(withStyles(styles)(Messenger));
