import {
    FETCH_GOOD_TO_KNOW_SUCCESS
} from "../actions/actionTypes";


const initialState = {
    articles: [],
};

const goodToKnowReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GOOD_TO_KNOW_SUCCESS:
            return { ...state, articles: action.payload };

        default:
            break;
    }
    return state;
};

export default goodToKnowReducer;
  