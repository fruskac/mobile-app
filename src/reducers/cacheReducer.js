import {
  CACHING_UPDATE,
  CACHING_DONE,
  CACHING_START,
  INTERNET_STATUS
} from "../store/types";

const initialState = {
  // all cache loaded
  done: false,
  // does phone have internet
  hasInternet: false,
  // is cache currently loading
  loading: false,
  // progress of loading cache
  progress: 0,
  // is map offline cached
  mapCached: false,
  // is news JSON cached
  newsCached: false,
  // is locations JSON cached
  locationsCached: false,
  // is trails data cached
  trailsCached: false,
  // is info data cached
  infoCached: false
};

const cacheReducer = (state = initialState, action) => {
  switch (action.type) {
    case INTERNET_STATUS:
      ({ ...state, hasInternet: action.hasInternet });
    case CACHING_START:
      ({ ...state, loading: true, progress: 0 });
    case CACHING_DONE:
      ({ ...state, done: true, loading: false, progress: 100 });
    case CACHING_UPDATE:
      ({ ...state, ...action.payload });
  }
  return state;
};

export default cacheReducer;
