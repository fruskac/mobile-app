import I18n from "react-native-i18n";

export function* updateLanguage(action) {
  const { language } = action;
  console.log("saga locale ", language);
  I18n.locale = language;
}
