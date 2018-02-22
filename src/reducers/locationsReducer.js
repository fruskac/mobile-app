import { LOCATION_FILTER_CHANGE } from "../actions/actionTypes";
import type { LocationFullData, LocationFilter } from "../types/";

//@flow

// load demo data
const locationDataSr: Array<
  LocationFullData
> = require("../assets//Demo/locations-rs.json");
const locationDataEn: Array<
  LocationFullData
> = require("../assets//Demo/locations-en.json");

// find all tags for both languages
let tagsSr: Array<string> = [];
let tagsEn: Array<string> = [];

locationDataSr.forEach(el => {
  if (tagsSr.indexOf(el.tag) === -1) tagsSr.push(el.tag);
});
locationDataEn.forEach(el => {
  if (tagsEn.indexOf(el.tag) === -1) tagsEn.push(el.tag);
});

type LocationState = {
  tagsSr: Array<string>,
  tagsEn: Array<string>,
  filter: LocationFilter,
  locations_sr: Array<LocationFullData>,
  locations_en: Array<LocationFullData>
};

const initialState = {
  tagsSr: tagsSr,
  tagsEn: tagsEn,
  filter: "type",
  locations_sr: locationDataSr,
  locations_en: locationDataEn
};

const locationsReducer = (
  state: LocationState = initialState,
  action: Object
) => {
  switch (action.type) {
    case LOCATION_FILTER_CHANGE:
      return { ...state, filter: action.filter };
    default:
      break;
  }
  return state;
};

export default locationsReducer;
