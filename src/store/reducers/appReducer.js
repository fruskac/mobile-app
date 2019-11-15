import { combineReducers } from 'redux';
import { navReducer } from './navReducer';
import goodToKnowReducer from './goodToKnowReducer';
import newsReducer from './newsReducer';
import settingsReducer from './settingsReducer';
import locationsReducer from './locationsReducer';
import cacheReducer from './cacheReducer';
import tracksReducer from './tracksReducer';
import infoReducer from './infoReducer';
import adsReducer from './adsReducer';

const appReducer = combineReducers({
  goodToKnow: goodToKnowReducer,
  locations: locationsReducer,
  nav: navReducer,
  news: newsReducer,
  cache: cacheReducer,
  settings: settingsReducer,
  tracks: tracksReducer,
  infos: infoReducer,
  ads: adsReducer
});
  
export default appReducer;