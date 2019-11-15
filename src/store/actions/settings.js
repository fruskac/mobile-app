import {
  TOGGLE_DRAWER,
  CHANGE_LANGUAGE,
  CLOSE_DRAWER
} from './actionTypes';
import I18n from 'react-native-i18n';

export function onChangeLanguage(language) {
  I18n.locale = language;
  return { type: CHANGE_LANGUAGE, language: language };
}

export function onToggleDrawer() {
  return { type: TOGGLE_DRAWER };
}

export function onCloseDrawer() {
  return { type: CLOSE_DRAWER }
}