import { select, put, all, take } from "redux-saga/effects";

import { REHYDRATE } from "redux-persist";
import { INTERNET_STATUS } from "../store/types";

export function* cache(action) {
  // wait for rehydrate and internet status to be done
  yield all([take(REHYDRATE), take(INTERNET_STATUS)]);
  // get loading data
  const cache = yield select(state => state.cache);

  if (!cache.done) {
  } else {
    // catch new stuff when internet arrives
  }
}
