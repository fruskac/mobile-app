import {
  LOCATION_FILTER_CHANGE,
  LOCATIONS_UPDATE_EN,
  LOCATIONS_UPDATE_SR
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
  locations_en: []
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
    default:
      break;
  }
  return state;
};

export default locationsReducer;
