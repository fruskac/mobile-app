import { select, put, all, take, call } from "redux-saga/effects";

import { REHYDRATE } from "redux-persist";
import {
  INTERNET_STATUS,
  SCREEN_NOTCACHED_NOINTERNET,
  SCREEN_CACHING_MAP,
  SCREEN_CACHING_ERROR,
  CACHING_DONE,
  CACHING_ERROR
} from "../actions/actionTypes";

import { areLocationsCached, cacheLocations } from "./cacheLocationsSaga";
import { isMapCached, startCachingMap } from "./cacheMapSaga";

export function* cache(action) {
  // wait for rehydrate and internet status to be done
  yield all([take(REHYDRATE), take(INTERNET_STATUS)]);
  // get loading data
  const cache = yield select(state => state.cache);
  console.log("CACHING DONE", cache.done);
  if (!cache.done) {
    const cacheList = [];

    console.log("CHECK CACHING");

    // CACHE MAP
    const mapCached = yield isMapCached();
    if (!mapCached) {
      cacheList.push(call(startCachingMap));
    }

    // CACHE LOCATIONS
    const locationsCached = yield areLocationsCached();
    if (!locationsCached) {
      cacheList.push(call(cacheLocations));
    }

    console.log("CACHED MAP", mapCached, "LOCATIONS CACHED", locationsCached);

    // only process cache list if there is something to be cached
    if (cacheList.length > 0) {
      // run all caches in sync
      const results = yield all(cacheList);

      console.log("RESULTS ", results);
      const allCachingSuccess = results.reduce((val, curr) => val && curr);

      console.log("All caching success", allCachingSuccess);

      if (allCachingSuccess) {
        // all caching success returned TRUE so we can mark caching as done
        yield put({ type: CACHING_DONE });
      } else {
        // error while caching
        // TODO potentially produce more descriptive errors
        yield put({ type: CACHING_ERROR });
      }
    } else {
      // no caching to be done just dispatch done
      yield put({ type: CACHING_DONE });
    }

    // all caching done
  }
}
