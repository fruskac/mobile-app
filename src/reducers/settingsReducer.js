import I18n from "react-native-i18n";
import {
  CHANGE_LANGUAGE,
  TOGGLE_DRAWER,
  NAVIGATE,
  NAVIGATE_BACK
} from "../store/types";

const initialState = {
  language: I18n.locale.substr(0, 2) === "en" ? "en" : "sr",
  drawerOpen: false
};

const settingsReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
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
