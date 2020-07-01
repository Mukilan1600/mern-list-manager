import { GET_ERROR, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  errmsg: "",
  status: null,
  id: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERROR:
      return {
        ...action.payload,
      };
    case CLEAR_ERRORS:
      return {
        errmsg: "",
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
