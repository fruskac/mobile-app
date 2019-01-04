import {
  LOCATION_FILTER_CHANGE,
  LOCATIONS_UPDATE_EN,
  LOCATIONS_UPDATE_SR,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_MAP_SUCCESS,
} from "../actions/actionTypes";
import type {
  LocationsList,
  LocationFullData,
  LocationFilter
} from "../types/";

type LocationState = {
  tags_rs: Array<string>,
  tags_en: Array<string>,
  filter: LocationFilter,
};

const initialState = {
  tags_rs: [],
  tags_en: [],
  filter: "type",
  locations_sr: [],
  locations_en: [],
  places_rs: [],
  places_en: [],
  tourism_rs: [],
  tourism_en: [],
  map_rs: [],
  map_en: [],
};

const locationsReducer = (
  state: LocationState = initialState,
  action: Object
) => {
  switch (action.type) {
    case LOCATION_FILTER_CHANGE:
      return { ...state, filter: action.filter };

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state, 
        locations_sr: action.payload.locations_sr,
        locations_en: action.payload.locations_en,
        places_rs: action.payload.places_rs,
        places_en: action.payload.places_en,
        tourism_rs: action.payload.tourism_rs,
        tourism_en: action.payload.tourism_en,
        tags_en: action.payload.tags_en,
        tags_rs: action.payload.tags_rs,
       };
      
    case FETCH_MAP_SUCCESS:
      return {
        ...state, 
        map_rs: action.payload.map_rs,
        map_en: action.payload.map_en,
       };

    default:
      break;
  }
  return state;
};

export default locationsReducer;
