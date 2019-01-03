import { select, put, all, take, call } from "redux-saga/effects";

import { REHYDRATE } from "redux-persist";
import {
  INTERNET_STATUS,
  CACHING_DONE,
  CACHING_ERROR
} from "../actions/actionTypes";

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
      const successfullyCached = yield call(startCachingMap);
    }
    // if (allCachingSuccess) {
    //   yield put({ type: CACHING_DONE });
    // } else {
    //   yield put({ type: CACHING_ERROR });
    // }
  }
}
