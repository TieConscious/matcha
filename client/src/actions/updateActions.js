import axios from "axios";

import {
  UPDATEUSER_SUCCESS,
  UPDATEUSER_FAIL,
  UPDATEFAMERATE_SUCCESS,
  UPDATEFAMERATE_FAIL,
  MESSAGESEND_SUCCESS,
  MESSAGESEND_FAIL,
  MESSAGEUPDATE_SUCCESS,
  MESSAGEUPDATE_FAIL,
  MESSAGERETRIEVE_SUCCESS,
  MESSAGERETRIEVE_FAIL,
  CURRENTCONVERSATION,
  UPDATEIMG_SUCCESS,
  UPDATEIMG_FAIL,
  NOTIFYSEEN_SUCCESS,
  NOTIFYSEEN_FAIL,
  GETNOTIFICATIONS_SUCCESS,
  GETNOTIFICATIONS_FAIL,
  GETCHATTERS_SUCCESS,
  GETCHATTERS_FAIL,
  TEMPPSSWD_SUCCESS,
  TEMPPSSWD_FAIL,
  DELETE_TEMP,
  NOTIFICATIONSUPDATE_SUCCESS,
  NOTIFICATIONSUPDATE_FAIL,
  CLEARNOTIFICATION_SUCCESS,
  CLEARNOTIFICATION_FAIL
} from "./types";

// Update user settings
export const updateSettings = ({
  firstname,
  lastname,
  bio,
  age,
  gender,
  sexualPreference,
  location,
  id,
  password
}) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({
    firstname,
    lastname,
    bio,
    age,
    gender,
    sexualPreference,
    location,
    id,
    password
  });
  axios
    .post("api/users/settings", body, config)
    .then(res => {
      dispatch({
        type: UPDATEUSER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATEUSER_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

export const updateLike = (otherId, likeOrUnlike, id) => dispatch => {
  console.log("otherId: " + otherId);
  console.log("like?: " + likeOrUnlike);
  console.log("id: " + id);
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ otherId, likeOrUnlike, id });
  console.log(body);
  axios
    .post("/api/users/like", body, config)
    .then(res => {
      dispatch({
        type: UPDATEUSER_SUCCESS,
        payload: res.data
      });
      console.log(res);
    })
    .catch(err => {
      dispatch({
        type: UPDATEUSER_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

// Notification actions
// <<--------------------------------------------------->>
// Notify user their profile has been viewed
export const notifySeen = (otherId, id) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ otherId, id });
  console.log(body);
  axios
    .post("/api/users/notify/viewed", body, config)
    .then(res => {
      dispatch({
        type: NOTIFYSEEN_SUCCESS,
        payload: res.data
      });
      console.log(res);
    })
    .catch(err => {
      dispatch({
        type: NOTIFYSEEN_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

// Get array of notifications and users
export const getNotificationArray = notificationArray => dispatch => {
  // Headers
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  // Request Body
  const body = JSON.stringify(notificationArray);
  axios
    .post("api/users/notify/getNotificationArray", body, config)
    .then(res => {
      dispatch({
        type: GETNOTIFICATIONS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GETNOTIFICATIONS_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

// Update notifications
export const updateNotifications = id => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ id });
  axios
    .post("/api/users/notify/updateNotifications", body, config)
    .then(res => {
      dispatch({
        type: NOTIFICATIONSUPDATE_SUCCESS,
        payload: res.data
      });
      console.log(res);
    })
    .catch(err => {
      dispatch({
        type: NOTIFICATIONSUPDATE_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

// Clear all notifications
export const clearNotifications = id => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ id });
  axios
    .post("api/users/notify/clearNotifications", body, config)
    .then(res => {
      dispatch({
        type: CLEARNOTIFICATION_SUCCESS,
        payload: res.data
      });
      console.log(res);
    })
    .catch(err => {
      dispatch({
        type: CLEARNOTIFICATION_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

// Messaging actions
// <<--------------------------------------------------->>
// Update current conversation
export const updateMessage = conversationID => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ conversationID });

  // return dispatch => {
  axios
    .post("api/users/messages/update", body, config)
    .then(res => {
      dispatch({
        type: MESSAGEUPDATE_SUCCESS,
        payload: res.data
      });
      console.log(res.data);
    })
    .catch(err => {
      dispatch({
        type: MESSAGEUPDATE_FAIL
      });
      console.log(err);
    });
  // };
};

// Update all messages
export const retrieveMessages = conversations => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ conversations });
  axios
    .post("api/users/messages/retrieve", body, config)
    .then(res => {
      dispatch({
        type: MESSAGERETRIEVE_SUCCESS,
        payload: res.data
      });
      console.log(res);
    })
    .catch(err => {
      dispatch({
        type: MESSAGERETRIEVE_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

// Set the current conversation for the user
export const setConversation = (currentConversation, currentConverser) => {
  const body = { currentConversation, currentConverser };
  return {
    type: CURRENTCONVERSATION,
    payload: body
  };
};

// Send a message to a user and notify them
export const sendMessage = (conversationID, sender, message) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ conversationID, sender, message });
  console.log(body);
  axios
    .post("api/users/messages/sendNewMessage", body, config)
    .then(res => {
      dispatch({
        type: MESSAGESEND_SUCCESS,
        payload: res.data
      });
      console.log(res);
    })
    .catch(err => {
      dispatch({
        type: MESSAGESEND_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

// Get array of notifications and users
export const getChattersArray = chattersArray => dispatch => {
  // Headers
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  console.log(chattersArray);
  // Request Body
  const body = JSON.stringify(chattersArray);
  axios
    .post("api/users/messages/getChattersArray", body, config)
    .then(res => {
      dispatch({
        type: GETCHATTERS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GETCHATTERS_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

export const updateFameRate = (otherId, likeOrUnlike) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ otherId, likeOrUnlike });
  console.log(body);
  axios
    .post("/api/users/famerate", body, config)
    .then(res => {
      dispatch({
        type: UPDATEFAMERATE_SUCCESS,
        payload: res.data
      });
      console.log(res);
    })
    .catch(err => {
      dispatch({
        type: UPDATEFAMERATE_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

export const updateImages = (id, data) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ id, data });
  console.log(body);
  axios
    .post("api/users/pictureadd", body, config)
    .then(res => {
      dispatch({
        type: UPDATEIMG_SUCCESS,
        payload: res.data
      });
      console.log(res);
    })
    .catch(err => {
      dispatch({
        type: UPDATEIMG_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

export const updateImagesFB = ( email, data ) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  // Request body
  const body = JSON.stringify({ email, data});
  console.log(body);
  axios
    .post("api/users/pictureaddemail", body, config)
    .then(res => {
        dispatch({
          type: UPDATEIMG_SUCCESS,
          payload: res.data
        })
        console.log(res);
      }
    )
    .catch(err => {
      dispatch({
        type: UPDATEIMG_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

export const forgotPassword = ( email ) => dispatch => {
   // Headers
   const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  // Request body
  const body = JSON.stringify({ email });
  console.log(body)
  axios
    .post("/api/users/forgot", body, config)
    .then(res => {
        console.log(body);
        dispatch({
          type: TEMPPSSWD_SUCCESS,
          payload: res.data
        })
        console.log(res);
      }
    )
    .catch(err => {
      dispatch({
        type: TEMPPSSWD_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
}

export const deleteTemp = () => dispatch => {
  dispatch({
    type: DELETE_TEMP,
    payload: null
  })
}
