/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";

export const fontSizeHeader = Platform.OS === "ios" ? 18 : 16;
export const backgroundColor = "#F6F7F1";
export const defaultMargin = 20;
export const navHeaderHeight = 45;
export const headerAdHeight = 40;
export const textColor = "#454546";
export const tintColor = "#0066ff";
export const accentColor = "#D51A5E";
export const borderColor = "#E2E3DE";
export const borderBottomColor = "#E0E1DC";
export const bgColorHeaderAd = "#d0d0d0";

export default StyleSheet.create({
  viewMargin: {
    margin: defaultMargin
  },
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
    backgroundColor: backgroundColor
  },
  text: {
    color: textColor,
    fontFamily: "Merriweather-Light"
  },
  errorText: {
    backgroundColor: "red",
    color: "white",
    padding: 4,
    fontSize: 16
  }
});
