import axios from "axios";

import {
  UPDATEUSER_SUCCESS,
  UPDATEUSER_FAIL,
  MESSAGESEND_SUCCESS,
  MESSAGESEND_FAIL
} from "./types";

// Update user settings
export const updateSettings = ({ firstname, lastname, bio, age, gender, sexualPreference, location, id }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  // Request body
  const body = JSON.stringify({ firstname, lastname, bio, age, gender, sexualPreference, location, id });
  axios
    .post("api/users/settings", body, config)
    .then(res => {
        dispatch({
          type: UPDATEUSER_SUCCESS,
          payload: res.data
        })
      }
    )
    .catch(err => {
      dispatch({
        type: UPDATEUSER_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

export const updateLike = ( otherId, likeOrUnlike, id ) => dispatch => {
  console.log("otherId: " + otherId);
  console.log("like?: " + likeOrUnlike);
  console.log("id: " + id);
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  // Request body
  const body = JSON.stringify({ otherId, likeOrUnlike, id });
  console.log(body);
  axios
    .post("api/users/like", body, config)
    .then(res => {
        dispatch({
          type: UPDATEUSER_SUCCESS,
          payload: res.data
        })
        console.log(res);
      }
    )
    .catch(err => {
      dispatch({
        type: UPDATEUSER_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

export const updateMessages = (conversationID) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({conversationID});
  console.log(body);
  axios
    .post("api/users/messages/update", body, config)
    .then(res => {
        console.log(res.data)
        dispatch({
          type: MESSAGESEND_SUCCESS,
          payload: res.data
        })
      }
    )
    .catch(err => {
      dispatch({
        type: MESSAGESEND_FAIL
      });
      console.log(err)
    });

}

export const sendMessage = ({conversationID, userID, message}) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  // Request body
  const body = JSON.stringify({conversationID, userID, message});
  console.log(body);
  axios
    .post("api/users/messages/send", body, config)
    .then(res => {
        dispatch({
          type: MESSAGESEND_SUCCESS,
          payload: res.data
        })
        console.log(res);
      }
    )
    .catch(err => {
      dispatch({
        type: MESSAGESEND_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
}
