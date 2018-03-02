import { put, all, call, select } from "redux-saga/effects";
import { fetchUrl } from "../utils/Fetch";
import {
  LOCATIONS_UPDATE_EN,
  LOCATIONS_UPDATE_SR,
  CACHING_UPDATE
} from "../actions/actionTypes";

export function* areLocationsCached() {
  const locations = yield select(state => state.locations);

  console.log("LOCATIONS ", locations);

  if (
    locations.locations_sr.length == 0 ||
    locations.locations_en.length == 0
  ) {
    return false;
  }

  return true;
}

export function* cacheLocations() {
  const [resultsEn, resultsSr] = yield all([
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
  if (resultsEn.constructor != Array || resultsSr.constructor != Array) {
    return false;
  }

  // send data to reducer to update state
  yield put({ type: LOCATIONS_UPDATE_EN, locations: resultsEn });
  yield put({ type: LOCATIONS_UPDATE_SR, locations: resultsSr });

  // update that locations have been cached
  yield put({ type: CACHING_UPDATE, payload: { locationsCached: true } });

  return true;
}
