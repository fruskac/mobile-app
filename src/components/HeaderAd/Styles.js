/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";
import {
  textColor,
  bgColorHeaderAd,
  headerAdHeight
} from "../../styles/CommonStyles";

export default StyleSheet.create({
  adHolder: {
    height: headerAdHeight,
    width: "100%",
    backgroundColor: bgColorHeaderAd,
    justifyContent: "center",
    alignItems: "center"
  }
});
