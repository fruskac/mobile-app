/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";
import { textColor, bgColorHeaderAd } from "../../styles/CommonStyles";

export default StyleSheet.create({
  adHolder: {
    height: 40,
    width: "100%",
    backgroundColor: bgColorHeaderAd,
    marginBottom: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  adText: {
    color: textColor,
    fontFamily: "Merriweather-Light"
  }
});
