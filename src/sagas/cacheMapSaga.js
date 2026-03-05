import { put, take, call } from "redux-saga/effects";
import { buffers, eventChannel, END } from "redux-saga";
import MapBox from "../maps/mapboxSafe";
import {
  OFFLINE_PACK_NAME,
  OFFLINE_MAPBOX_STYLE_URL,
  OFFLINE_REGION_BOUNDS,
  OFFLINE_REGION_MIN_ZOOM,
  OFFLINE_REGION_MAX_ZOOM
} from "../maps/offlineConfig";
import { CACHING_UPDATE, SCREEN_CACHING_ERROR } from "../actions/actionTypes";

export function* isMapCached() {
  try {
    if (!MapBox || !MapBox.offlineManager) {
      return false;
    }

    // get cached packs
    // delete current cache
    // yield MapBox.offlineManager.deletePack("FruskaGora");
    // get number of cached packs, we only cache one
    const offlineMaps = yield MapBox.offlineManager.getPacks();
    if (!Array.isArray(offlineMaps) || offlineMaps.length === 0) {
      return false;
    }

    return offlineMaps.some(pack => {
      if (!pack || typeof pack !== "object") return false;
      return pack.name === OFFLINE_PACK_NAME;
    });
  } catch (err) {
    console.log("isMapCached error", err);
    return false;
  }
}

export function* startCachingMap() {
  let channel;
  try {
    // create channel for caching map
    channel = yield call(cacheMap);

    while (true) {
      const { progress = 0, err, success } = yield take(channel);
      if (err) {
        console.log("startCachingMap error", err);
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
  } catch (err) {
    console.log("startCachingMap fatal error", err);
    yield put({
      type: CACHING_UPDATE,
      payload: { screen: SCREEN_CACHING_ERROR }
    });
    return false;
  } finally {
    if (channel && channel.close) {
      channel.close();
    }
  }
}

function cacheMap() {
  return eventChannel(emitter => {
    if (!MapBox || !MapBox.offlineManager) {
      emitter({ err: new Error("MapBox offline manager unavailable") });
      emitter(END);
      return () => {};
    }

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

    try {
      MapBox.offlineManager.createPack(
        {
          name: OFFLINE_PACK_NAME,
          minZoom: OFFLINE_REGION_MIN_ZOOM,
          maxZoom: OFFLINE_REGION_MAX_ZOOM,
          bounds: OFFLINE_REGION_BOUNDS,
          styleURL: OFFLINE_MAPBOX_STYLE_URL
        },
        (offlineRegion, status) => {
          onOfflineMapProgress(offlineRegion, status);
        },
        (offlineRegion, err) => {
          onOfflineMapError(offlineRegion, err);
        }
      );
    } catch (err) {
      emitter({ err });
      emitter(END);
    }

    return () => {};
  }, buffers.sliding(2));
}
