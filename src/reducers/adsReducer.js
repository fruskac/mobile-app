import {
    FETCH_CONFIG_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    sponsor_logo: {},
    big_add: {},
    small_add: {}
};

const adsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONFIG_SUCCESS:
            return { ...state, sponsor_logo: action.payload.sponsor_logo, big_add: action.payload.big_add, small_add: action.payload.small_add };

        default:
            break;
    }
    return state;
};

export default adsReducer;