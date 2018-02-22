import { createSelector } from "reselect";

const _getLocations = state =>
  state.locations["locations_" + state.settings.language];

const _getLocationId = (state, props) => props.navigation.state.params.id;

const _getLocationFilter = state => state.locations.filter;

const _getLocationTypePlaceId = (state, props) =>
  props.navigation.state.params.id;

// export const getLocations = createSelector([_getLocations], locations => {
//   return locations;
// });

export const getLocationSingle = createSelector(
  [_getLocations, _getLocationId],
  (locations, locationId) =>
    locations
      .slice(0)
      .filter(item => item.data.id === locationId)
      .map(i => i.data)
);

export const getLocationsFiltered = createSelector(
  [_getLocations, _getLocationTypePlaceId],
  (locations, locationTypePlaceId) =>
    locations.filter(item => item.tag == locationTypePlaceId).map(i => i.data)
);
