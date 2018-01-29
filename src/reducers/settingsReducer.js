import I18n from "react-native-i18n";
import { CHANGE_LANGUAGE } from "../store/types";

const initialState = {
  language: I18n.locale.substr(0, 2) === "en" ? "en" : "sr"
};

const settingsReducer = (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language
      };
      break;
  }
  return state;
};

export default settingsReducer;
