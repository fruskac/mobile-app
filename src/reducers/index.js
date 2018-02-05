import { combineReducers } from "redux";
import navReducer from "./navReducer";
import newsReducer from "./newsReducer";
import settingsReducer from "./settingsReducer";
// Root Reducer
const rootReducer = combineReducers({
  nav: navReducer,
  news: newsReducer,
  settings: settingsReducer
});

export default rootReducer;
