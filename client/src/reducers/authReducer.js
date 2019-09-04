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
  MESSAGESEND_FAIL,
  MESSAGEUPDATE_SUCCESS,
  MESSAGEUPDATE_FAIL,
  MESSAGERETRIEVE_SUCCESS,
  MESSAGERETRIEVE_FAIL,
  CURRENTCONVERSATION,
  UPDATEFAMERATE_SUCCESS,
  UPDATEFAMERATE_FAIL,
  UPDATEIMG_SUCCESS,
  UPDATEIMG_FAIL,
  NOTIFYSEEN_SUCCESS,
  NOTIFYSEEN_FAIL,
  GETNOTIFICATIONS_SUCCESS,
  GETNOTIFICATIONS_FAIL,
  GETCHATTERS_SUCCESS,
  GETCHATTERS_FAIL,
  TEMPPSSWD_SUCCESS,
  DELETE_TEMP,
  NOTIFICATIONSUPDATE_SUCCESS,
  NOTIFICATIONSUPDATE_FAIL,
  CLEARNOTIFICATION_SUCCESS,
  CLEARNOTIFICATION_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  pmatches: null,
  conversations: null,
  currentConversation: null,
  notificationsArray: null,
  notifications: null,
  chattersArray: null,
  temp: null,
  currentConverser: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TEMP:
      return {
        ...state,
        temp: null
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      console.log(action.payload);
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
        isLoading: false,
        pmatches: null,
        conversations: null,
        currentConversation: null,
        notificationsArray: null,
        chattersArray: null,
        notifications: null,
        currentConverser: null
      };
    case EXPLORE_SUCCESS:
      return {
        ...state,
        pmatches: action.payload
      };
    case TEMPPSSWD_SUCCESS:
      return {
        ...state,
        temp: action.payload
      };
    case UPDATEIMG_SUCCESS:
    case UPDATETAGS_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case UPDATEIMG_FAIL:
    case UPDATETAGS_FAIL:
    case EXPLORE_FAIL:
    case UPDATEFAMERATE_SUCCESS:
    case UPDATEFAMERATE_FAIL:
    case MESSAGEUPDATE_FAIL:
    case MESSAGERETRIEVE_FAIL:
    case MESSAGESEND_FAIL:
    case UPDATEUSER_FAIL:
    case NOTIFYSEEN_FAIL:
    case GETNOTIFICATIONS_FAIL:
    case GETCHATTERS_FAIL:
    case NOTIFICATIONSUPDATE_FAIL:
    case CLEARNOTIFICATION_FAIL:
      return state;
    case UPDATEUSER_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case MESSAGESEND_SUCCESS:
      return {
        ...state,
        currentConversation: action.payload
      };
    case MESSAGEUPDATE_SUCCESS:
      return {
        ...state,
        currentConversation: action.payload
      };
    case MESSAGERETRIEVE_SUCCESS:
      return {
        ...state,
        conversations: action.payload
      };
    case CURRENTCONVERSATION:
      console.log(action.payload);
      return {
        ...state,
        currentConversation: action.payload.currentConversation,
        currentConverser: action.payload.currentConverser
      };
    case NOTIFYSEEN_SUCCESS:
      return {
        ...state
      };
    case GETNOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notificationsArray: action.payload
      };
    case NOTIFICATIONSUPDATE_SUCCESS:
      return {
        ...state,
        notifications: action.payload
      };
    case GETCHATTERS_SUCCESS:
      return {
        ...state,
        chattersArray: action.payload
      };
    case CLEARNOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        notificationsArray: action.payload
      };
    default:
      return state;
  }
}
