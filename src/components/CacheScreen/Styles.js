/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";
import * as Screen from "../../utils/Screen";
import CommonStyles, {
  textColor,
  bgColorHeaderAd,
  backgroundColor,
  headerAdHeight
} from "../../styles/CommonStyles";

export default StyleSheet.create({
  holder: {
    position: "absolute",
    left: 0,
    zIndex: 40,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: backgroundColor,
    height: Screen.height,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  topText: {
    marginTop: Screen.height * 0.17
  },
  loader: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20
  },
  progressText: {
    marginTop: 40,
    fontSize: 20
  },
  bottomText: {
    marginBottom: Screen.height * 0.12
  }
});
