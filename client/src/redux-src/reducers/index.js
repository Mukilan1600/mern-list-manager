import { combineReducers } from "redux";
import ItemsReducer from "./ItemsReducer";
import AuthReducer from "./AuthReducer";
import ErrorReducer from "./ErrorReducer";

export default combineReducers({
  item: ItemsReducer,
  auth: AuthReducer,
  error: ErrorReducer,
});
