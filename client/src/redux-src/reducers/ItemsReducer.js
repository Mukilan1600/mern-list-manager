import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  ITEMS_LOADED,
} from "../actions/types";

const initialState = {
  items: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(({ _id, name }) => _id !== action.payload),
      };
    case ITEMS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ITEMS_LOADED:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
