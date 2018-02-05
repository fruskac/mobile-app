/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";

import { textColor, bgColorHeaderAd } from "../../styles/CommonStyles";
import * as Screen from "../../utils/Screen";

export default StyleSheet.create({
  itemHolder: {
    width: Screen.width,
    height: 95,
    marginBottom: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  itemImg: { width: Screen.width / 2, height: "100%" },
  itemText: {
    color: textColor,
    padding: 5,
    flex: 1,
    fontFamily: "Merriweather-Light"
  }
});
