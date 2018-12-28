import { all, call } from "redux-saga/effects";
import { updateLanguage } from "./settingsSaga";
import { cache } from "./cacheSaga";

export default function* root() {
  yield all([call(updateLanguage)]);
}
