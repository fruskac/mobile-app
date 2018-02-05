// @flow

import { NAVIGATE, NAVIGATE_BACK, OPEN_AD } from "../store/types";

export function onNavigate(route: string) {
  return { type: NAVIGATE, route: route };
}

export function onNavigateBack() {
  return { type: NAVIGATE_BACK };
}

export function onOpenAd() {
  return { type: OPEN_AD };
}
