import { select, put, all, take, call, race } from "redux-saga/effects";
import { Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";

import { REHYDRATE } from "redux-persist";
import {
  INTERNET_STATUS,
  CACHING_DONE,
  CACHING_ERROR
} from "../actions/actionTypes";

import { areLocationsCached, cacheLocations } from "./cacheLocationsSaga";
import { isMapCached, startCachingMap } from "./cacheMapSaga";

export function* cache(action) {
  // wait for rehydrate and internet status to be done
  yield take(REHYDRATE);
  yield race({
    internetReady: take(INTERNET_STATUS),
    timeout: call(waitMs, 2000)
  });
  // get loading data
  const cache = yield select(state => state.cache);
  let hasInternetNow = !!cache.hasInternet;
  try {
    const networkState = yield call([NetInfo, NetInfo.fetch]);
    if (networkState && typeof networkState.isConnected === "boolean") {
      hasInternetNow = networkState.isConnected;
    } else if (networkState && networkState.type && networkState.type !== "unknown") {
      hasInternetNow =
        networkState.type == "wifi" || networkState.type == "cellular";
    }
  } catch (err) {
    // Keep reducer-derived status when NetInfo.fetch is unavailable.
  }

  const locationsCached = yield areLocationsCached();
  const shouldCacheMap = Platform.OS === "ios";
  const mapCached = shouldCacheMap ? yield isMapCached() : true;
  // Re-run caching if persisted cache flags say "done" but required data is missing.
  if (!cache.done || !locationsCached || !mapCached) {
    const cacheList = [];

    // CACHE MAP
    if (shouldCacheMap && !mapCached && hasInternetNow) {
      cacheList.push(call(startCachingMap));
    }

    // CACHE LOCATIONS
    if (!locationsCached) {
      cacheList.push(call(cacheLocations));
    }

    // only process cache list if there is something to be cached
    if (cacheList.length > 0) {
      // run all caches in sync
      const results = yield all(cacheList);
      const allCachingSuccess = results.reduce((val, curr) => val && curr);

      if (allCachingSuccess) {
        // all caching success returned TRUE so we can mark caching as done
        yield put({ type: CACHING_DONE });
      } else {
        // error while caching
        // Do not block app bootstrap if offline caching fails on legacy devices/setups.
        yield put({ type: CACHING_ERROR });
        yield put({ type: CACHING_DONE });
      }
    } else {
      // no caching to be done just dispatch done
      yield put({ type: CACHING_DONE });
    }

    // all caching done
  }
}

function waitMs(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
