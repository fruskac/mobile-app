import { createSelector } from "reselect";

const _getLocations = state =>
  state.locations["locations_" + state.settings.language];

const getActiveNavParams = (state, props) => {
  if (
    props &&
    props.navigation &&
    props.navigation.state &&
    props.navigation.state.params
  ) {
    return props.navigation.state.params;
  }

  if (
    state &&
    state.nav &&
    Array.isArray(state.nav.routes) &&
    typeof state.nav.index === "number" &&
    state.nav.routes[state.nav.index] &&
    state.nav.routes[state.nav.index].params
  ) {
    return state.nav.routes[state.nav.index].params;
  }

  return {};
};

const _getLocationId = (state, props) => getActiveNavParams(state, props).id;

const _getLocationFilter = state => state.locations.filter;

const _getLocationTypePlaceId = (state, props) =>
  getActiveNavParams(state, props).id;

export const getLocations = createSelector(
  [_getLocations],
  locations => locations
);

export const getLocationSingle = createSelector(
  [_getLocations, _getLocationId],
  (locations, locationId) => {
    const match = locations.find(
      item => item && item.data && String(item.data.id) === String(locationId)
    );
    return match ? match.data : null;
  }
);

export const getLocationsFiltered = createSelector(
  [_getLocations, _getLocationTypePlaceId],
  (locations, locationTypePlaceId) =>
    locations.filter(item => item.tag == locationTypePlaceId).map(i => i.data)
);

export const getLocationsForMap = createSelector(
  [_getLocations],
  locations => {
    const safeLocations = Array.isArray(locations) ? locations : [];
    const features = safeLocations
      .filter(
        l =>
          l &&
          l.data &&
          l.tag &&
          l.tag !== "waterfalls" &&
          Number.isFinite(parseFloat(l.lng)) &&
          Number.isFinite(parseFloat(l.lat))
      )
      .map(l => ({
        type: "Feature",
        id: l.data.id,
        properties: {
          id: l.data.id,
          locationId: l.data.id,
          title: l.data.title || l.data.title_sr || l.data.title_en || "",
          title_sr: l.data.title_sr || "",
          title_en: l.data.title_en || "",
          icon: l.tag.replace("-", "") + "Map"
        },
        geometry: {
          type: "Point",
          coordinates: [parseFloat(l.lng), parseFloat(l.lat)]
        }
      }));

    return {
      type: "FeatureCollection",
      features
    };
  }
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
