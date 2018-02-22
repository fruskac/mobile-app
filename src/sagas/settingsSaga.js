import I18n from "react-native-i18n";
import { takeLatest, take } from "redux-saga/effects";
import { CHANGE_LANGUAGE } from "../actions/actionTypes";

export function* updateLanguage() {
  while (true) {
    const action = yield take(CHANGE_LANGUAGE);
    const { language } = action;
    I18n.locale = language;
  }
}
