/**
 * @flow
 */
import { StyleSheet, Platform } from "react-native";
import {
  textColor,
  borderBottomColor,
  borderColor
} from "../../styles/CommonStyles";

export const menuHeight: number = 40;
export const easyColor: string = "#808900";
export const mediumColor: string = "#FCB900";
export const hardColor: string = "#B80000";

export default StyleSheet.create({
  topMenu: {
    width: "100%",
    height: menuHeight,
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
  menu: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuItem: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
    padding: 15,
    alignItems: "center"
  },
  circlesBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 18/2,
    backgroundColor: 'red',
    margin: 9
  },
  colorEasy: {
    backgroundColor: easyColor
  },
  colorMedium: {
    backgroundColor: mediumColor
  },
  colorHard: {
    backgroundColor: hardColor
  },
  menuItemText: {
    textAlign: "center",
    fontFamily: "Merriweather-Light",
    fontSize: 15,
    lineHeight: 21,
  }
});
