// @flow

import { INTERNET_STATUS } from "./actionTypes";

export function onInternetStatus(hasInternet: boolean) {
  return { type: INTERNET_STATUS, hasInternet: hasInternet };
}
