import { takeLatest, all } from "redux-saga/effects";
import { CHANGE_LANGUAGE } from "../store/types";
import { updateLanguage } from "./settingsSaga";

export default function* root() {
  yield [takeLatest(CHANGE_LANGUAGE, updateLanguage)];
}
