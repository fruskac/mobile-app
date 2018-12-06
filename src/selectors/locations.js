import { createSelector } from "reselect";

const _getLocations = state =>
  state.locations["locations_" + state.settings.language];

const _getLocationsAll = state =>
  state.locations["locations_en"]
    .concat(state.locations["places_" + (state.settings.language == 'en' ? 'en' : 'rs')])
    .concat(state.locations["tourism_" + (state.settings.language == 'en' ? 'en' : 'rs')]);

const _getMapLocationsAll = state =>
  state.locations["map_" + (state.settings.language == 'en' ? 'en' : 'rs')];
  
const _getLocationId = (state, props) => props.navigation.state.params.id;

const _getLocationFilter = state => state.locations.filter;

const _getLocationTypePlaceId = (state, props) =>
  props.navigation.state.params.id;

export const getLocations = createSelector(
  [_getLocations],
  locations => locations
);

export const getLocationSingle = createSelector(
  [_getMapLocationsAll, _getLocationId],
  (locations, locationId) =>
    locations
      .slice(0)
      .filter(item => item.id === locationId)[0]
);

export const getLocationsFiltered = createSelector(
  [_getMapLocationsAll, _getLocationTypePlaceId],
  (locations, locationTypePlaceId) =>
    locations
      .filter(item => item.tag == locationTypePlaceId || item.category == locationTypePlaceId || item.place == locationTypePlaceId)
);

export const getPlaceOrCategory = createSelector(
  [_getLocationsAll, _getLocationTypePlaceId],
  (locations, locationTypePlaceId) =>
    locations
      .filter(item => item.key == locationTypePlaceId || item.name == locationTypePlaceId)[0]
);

export const getLocationsForMap = createSelector(
  [_getLocations],
  locations => ({
    type: "FeatureCollection",
    features: locations.filter(l => l.tag !== "waterfalls").map(l => ({
      type: "Feature",
      id: l.data.id,
      properties: {
        icon: l.tag.replace("-", "") + "Map"
      },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(l.lng), parseFloat(l.lat)]
      }
    }))
  })
);
