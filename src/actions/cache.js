// @flow

import { INTERNET_STATUS } from "../store/types";

export function onInternetStatus(hasInternet: boolean) {
  console.log("on internet status", hasInternet);
  return { type: INTERNET_STATUS, hasInternet: hasInternet };
}
