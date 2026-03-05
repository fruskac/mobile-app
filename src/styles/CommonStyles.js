/**
 * @flow
 */
import { StyleSheet } from "react-native";
import { theme } from "../design-system/theme";

export const fontSizeHeader = theme.typography.fontSizeHeader;
export const backgroundColor = theme.colors.background;
export const defaultMargin = theme.spacing.defaultMargin;
export const navHeaderHeight = theme.spacing.navHeaderHeight;
export const headerAdHeight = theme.spacing.headerAdHeight;
export const textColor = theme.colors.text;
export const tintColor = theme.colors.tint;
export const accentColor = theme.colors.accent;
export const borderColor = theme.colors.border;
export const borderBottomColor = theme.colors.borderBottom;
export const bgColorHeaderAd = theme.colors.headerAd;

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
    fontFamily: theme.typography.fontFamily
  },
  errorText: {
    backgroundColor: "red",
    color: "white",
    padding: 4,
    fontSize: 16
  }
});
