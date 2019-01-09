import { all, call } from "redux-saga/effects";
import { updateLanguage } from "./settingsSaga";

export default function* root() {
  yield all([call(updateLanguage)]);
}
