import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_SUCCESS,
  AUTH_FAIL,
  USER_LOADING,
  LOGOUT_SUCCESS,
} from "./types";
import { getError } from "./ErrorActions";
import axios from "axios";

export const loadUser = () => (dispatch) => {
  dispatch({ type: USER_LOADING });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const tok = localStorage.getItem("token");

  config.headers["x-auth-token"] = tok;

  axios
    .get("/api/users/auth", config)
    .then((user) => {
      dispatch({ type: AUTH_SUCCESS, payload: user.data });
    })
    .catch((e) => {
      dispatch({ type: AUTH_FAIL });
      dispatch(getError(e.response.data, e.response.status));
    });
};

export const loginUser = (email, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  axios
    .post("/api/users/login", body, config)
    .then((response) =>
      dispatch({ type: LOGIN_SUCCESS, payload: response.data })
    )
    .catch((e) => {
      dispatch(getError(e.response.data, e.response.status, LOGIN_FAIL));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const registerUser = (name, email, password) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users/register", body, config)
    .then((response) =>
      dispatch({ type: REGISTER_SUCCESS, payload: response.data })
    )
    .catch((e) => {
      dispatch(getError(e.response.data, e.response.status, REGISTER_FAIL));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
