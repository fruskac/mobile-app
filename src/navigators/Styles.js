/**
 * @flow
 */
import { StyleSheet } from "react-native";
import {
  fontSizeHeader,
  navHeaderHeight,
  backgroundColor
} from "../styles/CommonStyles";

export default StyleSheet.create({
  header: {
    height: navHeaderHeight,
    backgroundColor: backgroundColor
  },
  headerTitle: {
    fontSize: fontSizeHeader,
    fontWeight: "normal",
    // fontFamily: "Merriweather-Light",
    textAlign: "center",
    alignSelf: "center"
  }
});
