import { combineReducers } from "redux";
import navReducer from "./navReducer";
import newsReducer from "./newsReducer";
import settingsReducer from "./settingsReducer";
import locationsReducer from "./locationsReducer";
import cacheReducer from "./cacheReducer";
// Root Reducer
const rootReducer = combineReducers({
  locations: locationsReducer,
  nav: navReducer,
  news: newsReducer,
  cache: cacheReducer,
  settings: settingsReducer
});

export default rootReducer;
