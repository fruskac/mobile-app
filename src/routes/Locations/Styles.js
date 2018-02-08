/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";
import {
  textColor,
  borderBottomColor,
  borderColor
} from "../../styles/CommonStyles";

export default StyleSheet.create({
  topMenu: {
    width: "100%",
    height: 40,
    flexDirection: "row"
  },
  topMenuItem: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: borderBottomColor,
    borderBottomWidth: 2
  },
  withRightBorder: {
    borderRightColor: borderColor,
    borderRightWidth: 1
  },
  scrollView: {
    flex: 1
  },
  menu: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  menuItem: {
    height: 95
  }
});
