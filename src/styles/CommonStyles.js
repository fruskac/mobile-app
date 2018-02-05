/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";

export const fontSizeHeader = Platform.OS === "ios" ? 18 : 16;
export const defaultMargin = 20;
export const textColor = "#4A4A4A";
export const tintColor = "#0066ff";
export const bgColorHeaderAd = "#d0d0d0";

export default StyleSheet.create({
  viewMargin: {
    margin: defaultMargin
  },
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
    backgroundColor: "white"
  }
});
