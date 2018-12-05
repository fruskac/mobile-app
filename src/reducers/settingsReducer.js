// @flow

import I18n from "react-native-i18n";
import {
  CHANGE_LANGUAGE,
  CLOSE_DRAWER,
  TOGGLE_DRAWER,
  NAVIGATE,
  NAVIGATE_BACK
} from "../actions/actionTypes";

type Settings = {
  language: string,
  drawerOpen: boolean
};

const initialState: Settings = {
  language: I18n.locale.substr(0, 2) === "en" ? "en" : "rs",
  drawerOpen: false
};

const settingsReducer = (state: Settings = initialState, action: Object) => {
  switch (action.type) {
    case CLOSE_DRAWER: {
      return {
        ...state,
        drawerOpen: false,
      };
    }
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language
      };
    case TOGGLE_DRAWER: {
      return {
        ...state,
        drawerOpen: !state.drawerOpen
      };
    }
    case NAVIGATE:
    case NAVIGATE_BACK:
      return {
        ...state,
        drawerOpen: false
      };
  }
  return state;
};

export default settingsReducer;
