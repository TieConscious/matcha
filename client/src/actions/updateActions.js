import axios from "axios";

import {
  UPDATEUSER_SUCCESS,
  UPDATEUSER_FAIL
} from "./types";

// Update user settings
export const updateSettings = ({ firstname, lastname, bio, age, gender, sexualPreference, id }) => dispatch => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };
  // Request body
  const body = JSON.stringify({ firstname, lastname, bio, age, gender, sexualPreference, id });
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
      console.log("ERROR: " + err)
    });
};


