/**
 * @flow
 */
import { StyleSheet } from "react-native";

import { textColor } from "../../styles/CommonStyles";
import * as Screen from "../../utils/Screen";

export default StyleSheet.create({
  textTitle: {
    color: textColor,
    fontFamily: "Merriweather-Light",
    fontSize: 19,
    padding: 20,
    paddingBottom: 16
  },
  text: {
    color: textColor,
    fontFamily: "Merriweather-Light",
    fontSize: 12,
    lineHeight: 22,
    padding: 20,
    paddingTop: 0
  }
});
