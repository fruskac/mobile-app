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

//@flow

// load demo data
// const locationDataSr: LocationsList = require("../assets//Demo/locations-rs.json");
// const locationDataEn: LocationsList = require("../assets//Demo/locations-en.json");

// find all tags for both languages
let tagsSr: Array<string> = [];
let tagsEn: Array<string> = [];

type LocationState = {
  tagsSr: Array<string>,
  tagsEn: Array<string>,
  filter: LocationFilter,
  locations_sr: LocationsList,
  locations_en: LocationsList
};

const initialState = {
  tagsSr: tagsSr,
  tagsEn: tagsEn,
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
    case LOCATIONS_UPDATE_EN:
      const locationsDataEn = action.locations;
      // reset tags list
      tagsEn = [];
      locationsDataEn.forEach(el => {
        if (tagsEn.indexOf(el.tag) === -1) tagsEn.push(el.tag);
      });
      return { ...state, locations_en: locationsDataEn, tagsEn: tagsEn };
      break;
    case LOCATIONS_UPDATE_SR:
      const locationsDataSr = action.locations;
      // reset tags list
      tagsSr = [];
      locationsDataSr.forEach(el => {
        if (tagsSr.indexOf(el.tag) === -1) tagsSr.push(el.tag);
      });
      return { ...state, locations_sr: locationsDataSr, tagsSr: tagsSr };
      break;
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
       };
      break;
      
    case FETCH_MAP_SUCCESS:
      return {
        ...state, 
        map_rs: action.payload.map_rs,
        map_en: action.payload.map_en,
       };
      break;

    default:
      break;
  }
  return state;
};

export default locationsReducer;
