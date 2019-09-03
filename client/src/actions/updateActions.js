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
  TEMPPSSWD_SUCCESS,
  TEMPPSSWD_FAIL,
  DELETE_TEMP
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
  id
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
    id
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
    .post("http://localhost:3000/api/users/like", body, config)
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


// Messaging Matches
export const updateMessages = conversationID => dispatch => {
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

export const retrieveMessages = (conversations) => dispatch => {
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
}

export const setConversation = (currentConversation) => {
  return {
    type: CURRENTCONVERSATION,
    payload: currentConversation
  }
}

export const sendMessage = ({
  conversationID,
  userID,
  message
}) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ conversationID, userID, message });
  console.log(body);
  axios
    .post("api/users/messages/send", body, config)
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
}

export const updateFameRate = ( otherId, likeOrUnlike) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  // Request body
  const body = JSON.stringify({ otherId, likeOrUnlike});
  console.log(body);
  axios
    .post("http://localhost:3000/api/users/famerate", body, config)
    .then(res => {
        dispatch({
          type: UPDATEFAMERATE_SUCCESS,
          payload: res.data
        })
        console.log(res);
      }
    )
    .catch(err => {
      dispatch({
        type: UPDATEFAMERATE_FAIL
      });
      console.log("ERROR: " + err);
      console.log("body: " + body + " config: " + config);
    });
};

export const updateImages = ( id, data) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  // Request body
  const body = JSON.stringify({ id, data});
  console.log(body);
  axios
    .post("api/users/pictureadd", body, config)
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