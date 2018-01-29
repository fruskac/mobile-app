import { CHANGE_LANGUAGE } from "../store/types";

export function onChangeLanguage(language) {
  return { type: CHANGE_LANGUAGE, language: language };
}
