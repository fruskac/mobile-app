import { select, put, all, take, call } from "redux-saga/effects";
import { delay } from "redux-saga";
import MapBox from "@mapbox/react-native-mapbox-gl";

import { REHYDRATE } from "redux-persist";
import {
  INTERNET_STATUS,
  CACHING_UPDATE,
  SCREEN_NOTCACHED_NOINTERNET,
  SCREEN_CACHING_JSON,
  SCREEN_CACHING_MAP,
  SCREEN_CACHING_ERROR
} from "../store/types";

export function* cache(action) {
  // wait for rehydrate and internet status to be done
  yield all([take(REHYDRATE), take(INTERNET_STATUS)]);
  // get loading data
  const cache = yield select(state => state.cache);

  console.log("CACHE", cache);

  if (!cache.done) {
    if (!cache.mapCached) {
      yield* cacheMap(cache.hasInternet);
    }
  }

  console.log("CACHING DONE");
  // get loading data
  const cachingDone = yield select(state => state.cache.done);
  if (cachingDone) put({ type: CACHING_DONE });
}

/**
 * Load map cache
 */
function* cacheMap(hasInternet) {
  console.log("CACHE MAP CALLED");
  let neLat = 45.211,
    neLng = 19.935,
    swLat = 45.112557,
    swLng = 19.32377;

  // get cached packs
  const offlineMaps = yield MapBox.offlineManager.getPacks();

  console.log("OFFLINE MAPS ", offlineMaps, hasInternet);

  if (!hasInternet && offlineMaps.length === 0) {
    // show no internet no cache info
    yield put({
      type: CACHING_UPDATE,
      payload: {
        loading: false,
        done: false,
        screen: SCREEN_NOTCACHED_NOINTERNET
      }
    });
  } else if (offlineMaps.length > 0) {
    // map is cached already continue
    yield put({
      type: CACHING_UPDATE,
      payload: {
        mapCached: true,
        screen: SCREEN_CACHING_JSON
      }
    });
  } else if (hasInternet && offlineMaps.length === 0) {
    // set loading state
    yield put({
      type: CACHING_UPDATE,
      payload: {
        loading: true,
        progress: 0,
        screen: SCREEN_CACHING_MAP
      }
    });
    // load offline map
    yield MapBox.offlineManager.createPack(
      {
        name: "FruskaGora",
        minZoom: 12,
        maxZoom: 13,
        bounds: [[neLng, neLat], [swLng, swLat]],
        // styleURL: "mapbox://styles/alexgvozden/cjc7l0w1y3jcr2snwkmzb8vm2"
        styleURL: "mapbox://styles/alexgvozden/cjcadlwfi0mez2so63ttb7hxo"
      },
      (offlineRegion, status) => {
        onOfflineMapProgress(offlineRegion, status);
      },
      (offlineRegion, err) => {
        onOfflineMapError(offlineRegion, err);
      }
    );
  }
}

function onOfflineMapProgress(offlineRegion, status) {
  console.log("loading ", status);
  if (status.percentage < 100) {
    put({ type: CACHING_UPDATE, payload: { progress: status.percentage } });
  } else {
    put({
      type: CACHING_UPDATE,
      payload: { progress: 100, mapCached: true, screen: SCREEN_CACHING_JSON }
    });
  }
}

function onOfflineMapError(offlineRegion, err) {
  put({
    type: CACHING_UPDATE,
    payload: { loading: false, done: false, screen: SCREEN_CACHING_ERROR }
  });
}
