import { combineReducers } from "redux";
import navReducer from "./navReducer";
import newsReducer from "./newsReducer";
import settingsReducer from "./settingsReducer";
import locationsReducer from "./locationsReducer";
// Root Reducer
const rootReducer = combineReducers({
  nav: navReducer,
  news: newsReducer,
  settings: settingsReducer,
  locations: locationsReducer
});

export default rootReducer;
