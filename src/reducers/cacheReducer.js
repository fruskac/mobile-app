import {
  CACHING_UPDATE,
  CACHING_ERROR,
  INTERNET_STATUS,
} from "../actions/actionTypes";

const initialState = {
  // internet status
  hasInternet: true,
  // progress of loading cache
  progress: 0,
  // error while downloading cache
  error: '',
};

const cacheReducer = (state = initialState, action) => {
  switch (action.type) {
    case INTERNET_STATUS:
      return { ...state, hasInternet: action.hasInternet };
    case CACHING_UPDATE:
      return { ...state, progress: action.payload };
    case CACHING_ERROR:
      return { ...state, error: action.payload };
  }
  return state;
};

export default cacheReducer;
