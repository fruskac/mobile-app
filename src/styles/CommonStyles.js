/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";

export const fontSizeHeader = Platform.OS === "ios" ? 18 : 16;
export const backgroundColor = "#F6F7F1";
export const defaultMargin = 20;
export const navHeaderHeight = 54;
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
  textTitle: {
    color: textColor,
    fontFamily: "Merriweather-Light",
    fontSize: 21,
    padding: 21,
    paddingBottom: 18
  },
  text: {
    color: textColor,
    fontFamily: "Merriweather-Light",
    fontSize: 12,
    lineHeight: 21,
    padding: 21,
    paddingTop: 0
  },
  textTabs: {
    color: textColor,
    fontFamily: "Merriweather-Light",
    fontSize: 15,
    lineHeight: 21,
    padding: 9,
    paddingTop: 0
  },
  onMapBtn: {
    position: 'absolute',
    backgroundColor: '#79b700',
    padding: 9,
    top: 54,
    // right: 12,
    right: 0,
    paddingRight: 12,
    zIndex: 12,
    // borderRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderWidth: 2.1,
    borderColor: textColor,
    borderRightWidth: 0
  },
  errorText: {
    backgroundColor: "red",
    color: "white",
    padding: 4,
    fontSize: 16
  },
  // Map
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  annotationContainerMini: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  selectedMarker: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 3,
    borderColor: '#FF6659',
    zIndex: 1000
  }
});
