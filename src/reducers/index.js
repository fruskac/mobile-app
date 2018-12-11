import { combineReducers } from "redux";
import goodToKnowReducer from "./goodToKnowReducer";
import navReducer from "./navReducer";
import newsReducer from "./newsReducer";
import settingsReducer from "./settingsReducer";
import locationsReducer from "./locationsReducer";
import cacheReducer from "./cacheReducer";
import tracksReducer from "./tracksReducer";
import infoReducer from "./infoReducer";
// Root Reducer
const rootReducer = combineReducers({
  goodToKnow: goodToKnowReducer,
  locations: locationsReducer,
  nav: navReducer,
  news: newsReducer,
  cache: cacheReducer,
  settings: settingsReducer,
  tracks: tracksReducer,
  infos: infoReducer,
});

export default rootReducer;
