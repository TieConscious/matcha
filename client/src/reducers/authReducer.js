import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATETAGS_SUCCESS,
  UPDATETAGS_FAIL,
  UPDATEUSER_SUCCESS,
  UPDATEUSER_FAIL,
  EXPLORE_SUCCESS,
  EXPLORE_FAIL,
  MESSAGESEND_SUCCESS,
  MESSAGESEND_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  pmatches: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      console.log(action.payload)
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    case UPDATETAGS_SUCCESS:
    case UPDATETAGS_FAIL:
    case EXPLORE_SUCCESS:
      return {
        ...state,
        pmatches: action.payload
      };
    case EXPLORE_FAIL:
      return state;
    case UPDATEUSER_SUCCESS:
    case UPDATEUSER_FAIL:
      return {
        ...state,
        ...action.payload
      };
    case MESSAGESEND_SUCCESS:
    case MESSAGESEND_FAIL:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}
