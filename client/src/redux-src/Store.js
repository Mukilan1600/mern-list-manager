import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

export default createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(ReduxThunk))
);
