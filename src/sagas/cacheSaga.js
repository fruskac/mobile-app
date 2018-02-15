import { select, put, all, take, call } from "redux-saga/effects";
import { delay, buffers, eventChannel, END } from "redux-saga";
import MapBox from "@mapbox/react-native-mapbox-gl";

import { REHYDRATE } from "redux-persist";
import {
  INTERNET_STATUS,
  CACHING_UPDATE,
  SCREEN_NOTCACHED_NOINTERNET,
  SCREEN_CACHING_MAP,
  SCREEN_CACHING_ERROR,
  CACHING_DONE
} from "../store/types";

let neLat = 45.211,
  neLng = 19.935,
  swLat = 45.112557,
  swLng = 19.32377;

export function* cache(action) {
  // wait for rehydrate and internet status to be done
  yield all([take(REHYDRATE), take(INTERNET_STATUS)]);
  // get loading data
  const cache = yield select(state => state.cache);

  if (!cache.done) {
    const mapCached = yield isMapCached();
    if (!mapCached) {
      // create channel for caching map
      const channel = yield call(cacheMap);

      while (true) {
        const { progress = 0, err, success } = yield take(channel);
        if (err) {
          yield put({
            type: CACHING_UPDATE,
            payload: { screen: SCREEN_CACHING_ERROR }
          });
          return;
        }
        if (success) {
          yield put({ type: CACHING_DONE });
          return;
        }
        yield put({ type: CACHING_UPDATE, payload: { progress: progress } });
      }
    }
  }
}

function* isMapCached() {
  // get cached packs
  yield MapBox.offlineManager.deletePack("FruskaGora");
  const offlineMaps = yield MapBox.offlineManager.getPacks();

  return offlineMaps.length > 0;
}

function cacheMap() {
  return eventChannel(emitter => {
    const onOfflineMapProgress = (offlineRegion, status) => {
      emitter({ progress: status.percentage });
      if (status.percentage == 100) {
        emitter({ success: true });
        emitter(END);
      }
    };

    const onOfflineMapError = (offlineRegion, err) => {
      emitter({ err: new Error("Map cache failed") });
      emitter(END);
    };

    MapBox.offlineManager.createPack(
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

    return () => {};
  }, buffers.sliding(2));
}

/**
 * Load map cache
 */
// function* cacheMap(hasInternet) {

//   if (!hasInternet && offlineMaps.length === 0) {
//     // show no internet no cache info
//     yield put({
//       type: CACHING_UPDATE,
//       payload: {
//         loading: false,
//         done: false,
//         screen: SCREEN_NOTCACHED_NOINTERNET
//       }
//     });
//   } else if (offlineMaps.length > 0) {
//     // map is cached already continue
//     yield put({
//       type: CACHING_UPDATE,
//       payload: {
//         mapCached: true
//       }
//     });
//   } else if (hasInternet && offlineMaps.length === 0) {
//     console.log("LOAD PACK");
//     // set loading state
//     yield put({
//       type: CACHING_UPDATE,
//       payload: {
//         loading: true,
//         progress: 0,
//         screen: SCREEN_CACHING_MAP
//       }
//     });
//     // load offline map
//     yield MapBox.offlineManager.createPack(
//       {
//         name: "FruskaGora",
//         minZoom: 12,
//         maxZoom: 13,
//         bounds: [[neLng, neLat], [swLng, swLat]],
//         // styleURL: "mapbox://styles/alexgvozden/cjc7l0w1y3jcr2snwkmzb8vm2"
//         styleURL: "mapbox://styles/alexgvozden/cjcadlwfi0mez2so63ttb7hxo"
//       },
//       (offlineRegion, status) => {
//         onOfflineMapProgress(offlineRegion, status);
//       },
//       (offlineRegion, err) => {
//         onOfflineMapError(offlineRegion, err);
//       }
//     );

//     console.log("Offline manager create pack");
//   }
// }
