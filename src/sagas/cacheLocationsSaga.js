import { put, all, call, select } from "redux-saga/effects";
import { fetchUrl } from "../utils/Fetch";
import {
  LOCATIONS_UPDATE_EN,
  LOCATIONS_UPDATE_SR,
  CACHING_UPDATE
} from "../actions/actionTypes";

const demoLocationsEn = require("../assets/Demo/locations-en.json");
const demoLocationsSr = require("../assets/Demo/locations-rs.json");

function isValidLocationItem(item) {
  return !!(
    item &&
    item.data &&
    item.data.id != null &&
    Number.isFinite(parseFloat(item.lat)) &&
    Number.isFinite(parseFloat(item.lng))
  );
}

function isValidLocationsPayload(payload) {
  return (
    Array.isArray(payload) &&
    payload.length > 0 &&
    payload.some(isValidLocationItem)
  );
}

export function* areLocationsCached() {
  const locations = yield select(state => state.locations);

  return (
    isValidLocationsPayload(locations.locations_sr) &&
    isValidLocationsPayload(locations.locations_en)
  );
}

export function* cacheLocations() {
  let [resultsEn, resultsSr] = yield all([
    call(
      fetchUrl,
      "https://fruskac.net/sites/default/files/map-data/locations-en.json"
    ),
    call(
      fetchUrl,
      "https://fruskac.net/sites/default/files/map-data/locations-rs.json"
    )
  ]);

  // console.log("Locations cached ", resultsEn, resultsSr, resultsEn.constructor);

  // check if any of locations loaded had error
  // it should have array of results if it was success
  if (!isValidLocationsPayload(resultsEn)) {
    resultsEn = demoLocationsEn;
  }
  if (!isValidLocationsPayload(resultsSr)) {
    resultsSr = demoLocationsSr;
  }

  if (!isValidLocationsPayload(resultsEn) || !isValidLocationsPayload(resultsSr)) {
    return false;
  }

  // send data to reducer to update state
  yield put({ type: LOCATIONS_UPDATE_EN, locations: resultsEn });
  yield put({ type: LOCATIONS_UPDATE_SR, locations: resultsSr });

  // update that locations have been cached
  yield put({ type: CACHING_UPDATE, payload: { locationsCached: true } });

  return true;
}
