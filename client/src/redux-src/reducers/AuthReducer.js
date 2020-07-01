import {
  AUTH_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_FAIL,
  USER_LOADING,
} from "../actions/types";

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  jwtToken: localStorage.getItem("token"),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.jwtToken);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        ...action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        jwtToken: null,
        user: null,
        isLoading: false,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
