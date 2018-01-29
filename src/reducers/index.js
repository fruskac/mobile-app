import { combineReducers } from "redux";
import navReducer from "./navReducer";
import settingsReducer from "./settingsReducer";
// Root Reducer
const rootReducer = combineReducers({
  nav: navReducer,
  settings: settingsReducer
});

export default rootReducer;
