import { createSelector } from "reselect";

const _getLocations = state =>
  state.locations["locations_" + state.settings.language];

const _getLocationsAll = state => {
  debugger 
  return state.locations && state.locations[`locations_${state.settings.language == 'en' ? 'en' : 'sr'}`] ? 
  state.locations[`locations_${state.settings.language == 'en' ? 'en' : 'sr'}`]
    .concat(state.locations["places_" + (state.settings.language == 'en' ? 'en' : 'rs')])
    .concat(state.locations["tourism_" + (state.settings.language == 'en' ? 'en' : 'rs')])
    : [];
}

const _getMapLocationsAll = state =>
  state.locations["map_" + (state.settings.language == 'en' ? 'en' : 'rs')];
  
const _getId = (state, props) => props.navigation.state.params.id;

const _getLocationFilter = state => state.locations.filter;

const _getLocationTypePlaceId = (state, props) =>
  props.navigation.state.params.id;

const _getCategoryName = (state, props) =>
  props.navigation.state.params.category;

export const getLocations = createSelector(
  [_getLocations],
  locations => locations
);

export const getLocationSingle = createSelector(
  [_getMapLocationsAll, _getId],
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

const _getTracks = (state, props) => props.screenProps.language === 'en' ? 
  state.tracks['tracks_en'] : state.tracks['tracks_rs'];

export const getTracks = createSelector(
  [_getTracks],
  tracks => tracks
);

export const getTracksByCategoryName = createSelector(
  [_getTracks, _getCategoryName],
  (tracks, categoryName) => 
    tracks.filter(track => track.track_category.toLowerCase() === categoryName.toLowerCase())  
);

export const getTrackSingle = createSelector(
  [_getTracks, _getId],
  (tracks, trackId) =>
    tracks.filter(item => item.id === trackId)[0]
);

const _getInfos = (state, props) => props.screenProps.language === 'en' ? 
    state.infos['info_en'] : state.infos['info_rs'];

export const getInfos = createSelector(
  [_getInfos],
  infos => infos
);

export const getInfoSingle = createSelector(
  [_getInfos, _getId],
  (infos, infoId) =>
    infos.filter(item => item.id === infoId)[0]
);

export const getPlaceOrCategory = createSelector(
  [_getLocationsAll, _getLocationTypePlaceId],
  (locations, locationTypePlaceId) => {
    debugger
    return locations.filter(item => item.key == locationTypePlaceId || item.name == locationTypePlaceId)[0]
  }
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
