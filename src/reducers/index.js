import { combineReducers } from "redux";
import tempReducer from "./tempReducer";
import navReducer from "./navReducer";
// Root Reducer
const rootReducer = combineReducers({
  temp: tempReducer,
  nav: navReducer
});

export default rootReducer;
