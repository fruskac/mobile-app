import {
    FETCH_GOOD_TO_KNOW_SUCCESS,
    FETCH_GOOD_TO_KNOW_START,
    FETCH_GOOD_TO_KNOW_FAILURE,
    SET_PAGE_NUMBER,
    SET_REFRESHING,
    ALLOW_FETCH,
} from "../actions/actionTypes";


const initialState = {
    articles: [],
    refreshing: false,
    pageNumber: 0,
    fetchAllowed: true,
};

const goodToKnowReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GOOD_TO_KNOW_START:
            return { ...state, fetchAllowed: false };

        case FETCH_GOOD_TO_KNOW_SUCCESS:
            return { ...state, articles: action.payload, fetchAllowed: true };

        case FETCH_GOOD_TO_KNOW_FAILURE:
            return { ...state, fetchAllowed: true };

        case SET_PAGE_NUMBER:
            return { ...state, pageNumber: action.payload };

        case SET_REFRESHING:
            return { ...state, refreshing: action.payload };
            
        case ALLOW_FETCH:
            return {...state, fetchAllowed: action.payload};
        default:
            break;
    }
    return state;
};

export default goodToKnowReducer;
  