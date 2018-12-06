import { createSelector } from "reselect";

const _getLocations = state =>
  state.locations["locations_" + state.settings.language];

const _getLocationsAll = state =>
  state.locations["locations_" + state.settings.language]
    .concat(state.locations["places_" + state.settings.language])
    .concat(state.locations["tourism_" + state.settings.language]);

const _getLocationId = (state, props) => props.navigation.state.params.id;

const _getLocationFilter = state => state.locations.filter;

const _getLocationTypePlaceId = (state, props) =>
  props.navigation.state.params.id;

export const getLocations = createSelector(
  [_getLocations],
  locations => locations
);

export const getLocationSingle = createSelector(
  [_getLocations, _getLocationId],
  (locations, locationId) =>
    require('../assets/Demo/app-map.json').appMap
      .slice(0)
      .filter(item => item.id === locationId)[0]
);

export const getLocationsFiltered = createSelector(
  [_getLocations, _getLocationTypePlaceId],
  (locations, locationTypePlaceId) =>
    require('../assets/Demo/app-map.json').appMap
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

// const featureCollection = {
//   type: "FeatureCollection",
//   features: [
//     {
//       type: "Feature",
//       id: "volem1",
//       properties: {
//         icon: "example"
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [19.8093, 45.1571]
//       }
//     },
//     {
//       type: "Feature",
//       id: "volem2",
//       properties: {
//         icon: "example"
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [19.7093, 45.1571]
//       }
//     }
//   ]
