import {
    FETCH_TRACKS_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
    tracks_rs: [],
    tracks_en: [],
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_SUCCESS:
            return { ...state, tracks_rs: action.payload.tracks_rs, tracks_en: action.payload.tracks_en };

        default:
            break;
    }
    return state;
};

export default tracksReducer;
  