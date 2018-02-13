//@flow
type LocationData = {
  lat: string,
  lon: string,
  tag: string,
  data: {
    title: string,
    id: string,
    link: string,
    description: string,
    image: string
  },
  options: {}
};

// load demo data
const locationDataSr: Array<
  LocationData
> = require("../assets//Demo/locations-rs.json");
const locationDataEn: Array<
  LocationData
> = require("../assets//Demo/locations-rs.json");

// find all tags for both languages
let tagsSr: Array<string> = [];
let tagsEn: Array<string> = [];

locationDataSr.forEach(el => {
  if (tagsSr.indexOf(el.tag) === -1) tagsSr.push(el.tag);
});
locationDataEn.forEach(el => {
  if (tagsEn.indexOf(el.tag) === -1) tagsEn.push(el.tag);
});

const initialState = {
  tagsSr: tagsSr,
  tagsEn: tagsEn
};

const locationsReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    default:
      break;
  }
  return state;
};

export default locationsReducer;
