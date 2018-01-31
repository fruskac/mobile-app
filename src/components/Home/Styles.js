/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";
import { textColor } from "../../styles/CommonStyles";

export default StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1,
    backgroundColor: "white"
  },
  menuHolder: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1
  },
  menuItem: {
    color: textColor,
    fontFamily: "Merriweather-Light",
    marginBottom: 8
  }
});
