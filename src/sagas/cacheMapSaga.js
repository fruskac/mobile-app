import { select, put, all, take, call } from "redux-saga/effects";
import { delay, buffers, eventChannel, END } from "redux-saga";
import MapBox from "@mapbox/react-native-mapbox-gl";
import { CACHING_UPDATE } from "../actions/actionTypes";

let neLat = 45.211,
  neLng = 19.935,
  swLat = 45.112557,
  swLng = 19.32377;

export function* isMapCached() {
  // get cached packs

  // delete current cache
  // yield MapBox.offlineManager.deletePack("FruskaGora");

  // get number of cached packs, we only cache one
  const offlineMaps = yield MapBox.offlineManager.getPacks();

  return offlineMaps.length > 0;
}

export function* startCachingMap() {
  // create channel for caching map
  const channel = yield call(cacheMap);

  while (true) {
    const { progress = 0, err, success } = yield take(channel);
    if (err) {
      yield put({
        type: CACHING_UPDATE,
        payload: { screen: SCREEN_CACHING_ERROR }
      });
      return false;
    }
    if (success) {
      return true;
    }
    yield put({ type: CACHING_UPDATE, payload: { progress: progress } });
  }
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
