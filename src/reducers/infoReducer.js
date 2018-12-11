import {
    FETCH_INFO_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
    info_en: [],
    info_rs: [],
};

const infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INFO_SUCCESS:
            return { ...state, info_en: action.payload.info_en, info_rs: action.payload.info_rs };

        default:
            break;
    }
    return state;
};

export default infoReducer;
  