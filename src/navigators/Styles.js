/**
 * @flow
 */
import { StyleSheet } from "react-native";
import { fontSizeHeader, navHeaderHeight } from "../styles/CommonStyles";

export default StyleSheet.create({
  header: {
    height: navHeaderHeight
  },
  headerTitle: {
    fontSize: fontSizeHeader,
    fontWeight: "normal",
    // fontFamily: "Merriweather-Light",
    textAlign: "center",
    alignSelf: "center"
  }
});
