/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";
import CommonStyles, { textColor } from "../../styles/CommonStyles";

export default StyleSheet.create({
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
