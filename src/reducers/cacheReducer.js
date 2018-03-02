import {
  CACHING_UPDATE,
  CACHING_DONE,
  CACHING_START,
  CACHING_ERROR,
  INTERNET_STATUS,
  SCREEN_INIT,
  SCREEN_CACHING_ERROR
} from "../actions/actionTypes";

const initialState = {
  // current caching scren
  screen: SCREEN_INIT,
  // all cache loaded
  done: false,
  // does phone have internet
  hasInternet: false,
  // is cache currently loading
  loading: false,
  // progress of loading cache
  progress: 0,
  // is trails data cached
  trailsCached: false,
  // is info data cached
  infoCached: false
};

const cacheReducer = (state = initialState, action) => {
  switch (action.type) {
    case INTERNET_STATUS:
      return { ...state, hasInternet: action.hasInternet };
    case CACHING_START:
      return { ...state, loading: true, progress: 0 };
    case CACHING_DONE:
      return { ...state, done: true, loading: false, progress: 100 };
    case CACHING_UPDATE:
      return { ...state, ...action.payload };
    case CACHING_ERROR:
      return { ...state, screen: SCREEN_CACHING_ERROR };
  }
  return state;
};

export default cacheReducer;
