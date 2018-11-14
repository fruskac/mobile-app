import { createSelector } from "reselect";

const _getLocations = state =>
  state.locations["locations_" + state.settings.language];

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
    locations
      .slice(0)
      .filter(item => item.data.id === locationId)
      .map(i => i.data)[0]
);

export const getLocationsFiltered = createSelector(
  [_getLocations, _getLocationTypePlaceId],
  (locations, locationTypePlaceId) =>
    locations.filter(item => item.tag == locationTypePlaceId).map(i => i.data)
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
