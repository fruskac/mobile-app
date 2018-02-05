//@flow

import newsDemoData from "../assets/Demo/news";
import { NEWS_LOADING, NEWS_LOADING_COMPLETE } from "../store/types";

const initialState = {
  data: newsDemoData
};

const newsReducer = (state: Object = initialState, action: Object) => {
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
