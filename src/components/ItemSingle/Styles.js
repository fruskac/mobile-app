/**
 * @flow
 */
import { StyleSheet } from "react-native";
import { textColor } from "../../styles/CommonStyles";

export default StyleSheet.create({
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
  }
});
