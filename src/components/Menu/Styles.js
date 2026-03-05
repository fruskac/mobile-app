/**
 * @flow
 */
import { StyleSheet } from "react-native";
import { textColor } from "../../styles/CommonStyles";

export default StyleSheet.create({
  heroImage: {
    backgroundColor: "#E5E6E2"
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
