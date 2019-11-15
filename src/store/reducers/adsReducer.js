import {
    FETCH_CONFIG_SUCCESS
} from '../actions/actionTypes';

const initialState = {
    sponsor_logo: {},
    big_ad: {},
    small_ad: {}
};

const adsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONFIG_SUCCESS:
            return { ...state, sponsor_logo: action.payload.sponsor_logo, big_ad: action.payload.big_ad, small_ad: action.payload.small_ad };

        default:
            break;
    }
    return state;
};

export default adsReducer;