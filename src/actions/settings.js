// @flow

import { TOGGLE_DRAWER, CHANGE_LANGUAGE } from "../store/types";

export function onChangeLanguage(language: string) {
  return { type: CHANGE_LANGUAGE, language: language };
}
export function onToggleDrawer() {
  return { type: TOGGLE_DRAWER };
}
