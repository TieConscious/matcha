import axios from "axios";

import {
  UPDATEUSER_SUCCESS,
  UPDATEUSER_FAIL
} from "./types";

// Update user settings
export const updateSettings = ( firstname, lastname, bio , userId) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  // Request body
  const body = JSON.stringify({ firstname, lastname, bio, userId });
  console.log(body);
  axios
    .post("api/users/update/settings", body, config)
    .then(res => {
        console.log(res)
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
      console.log("ERROR: " + err)
    });
};


