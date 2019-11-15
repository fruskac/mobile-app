import { NEWS_LOADING, NEWS_LOADING_COMPLETE } from '../actions/actionTypes';

const initialState = {
  data: []
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWS_LOADING:
      return {
        ...state,
        loading: true
      };

    case NEWS_LOADING_COMPLETE:
      return { loading: false, data: action.data };
  }
  return state;
};

export default newsReducer;
