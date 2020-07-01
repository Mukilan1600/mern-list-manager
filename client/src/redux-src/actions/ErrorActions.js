import { GET_ERROR, CLEAR_ERRORS } from "./types";

export const getError = (errmsg, status, id = null) => {
  return {
    type: GET_ERROR,
    payload: { errmsg, status, id },
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
