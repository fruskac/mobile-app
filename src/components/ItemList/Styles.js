/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";

import {
  textColor,
  bgColorHeaderAd,
  borderBottomColor
} from "../../styles/CommonStyles";
import * as Screen from "../../utils/Screen";

export default StyleSheet.create({
  itemHolder: {
    width: Screen.width,
    height: 95,
    marginBottom: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderTopWidth: 1,
    borderTopColor: borderBottomColor
  },
  itemImg: { width: Screen.width / 2, height: "100%" },
  itemText: {
    color: textColor,
    padding: 5,
    paddingLeft: 8,
    flex: 1,
    fontFamily: "Merriweather-Light"
  }
});
