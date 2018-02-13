// @flow

import { INTERNET_STATUS } from "../store/types";

export function onInternetStatus(hasInternet: boolean) {
  return { type: INTERNET_STATUS, hasInternet: hasInternet };
}
