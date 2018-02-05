// @flow

import { CHANGE_LANGUAGE } from "../store/types";

export function onChangeLanguage(language: string) {
  return { type: CHANGE_LANGUAGE, language: language };
}
