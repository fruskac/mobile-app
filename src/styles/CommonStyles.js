/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";

export const fontSizeHeader = Platform.OS === "ios" ? 18 : 16;
export const defaultMargin = 20;
export const textColor = "#4A4A4A";
export const tintColor = "#0066ff";

export default StyleSheet.create({
  viewMargin: {
    margin: defaultMargin
  }
});
