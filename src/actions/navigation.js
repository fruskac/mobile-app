import { NAVIGATE, NAVIGATE_BACK } from "../store/types";

export function onNavigate(route) {
  return { type: NAVIGATE, route: route };
}

export function onNavigateBack() {
  return { type: NAVIGATE_BACK };
}
