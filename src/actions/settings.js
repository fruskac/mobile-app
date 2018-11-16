// @flow

import {
  TOGGLE_DRAWER,
  CHANGE_LANGUAGE,
  LOCATION_FILTER_CHANGE,
  CLOSE_DRAWER
} from "./actionTypes";

import type LocationType from "../reducers/settingsReducer";

export function onChangeLanguage(language: string) {
  return { type: CHANGE_LANGUAGE, language: language };
}

export function onToggleDrawer() {
  return { type: TOGGLE_DRAWER };
}

export function onCloseDrawer() {
  return { type: CLOSE_DRAWER }
}