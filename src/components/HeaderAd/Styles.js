/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";
import { textColor, bgColorHeaderAd } from "../../styles/CommonStyles";

export default StyleSheet.create({
  adHolder: {
    height: 40,
    textAlign: "center",
    width: "100%",
    color: textColor,
    backgroundColor: bgColorHeaderAd,
    marginBottom: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  adText: {
    fontFamily: "Merriweather-Light"
  }
});
