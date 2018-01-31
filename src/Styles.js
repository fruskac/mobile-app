/**
 * @flow
 */
import { StyleSheet } from "react-native";

import { fontSizeHeader } from "./styles/CommonStyles";

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  header: {
    height: 40
  },
  headerTitle: {
    fontSize: fontSizeHeader,
    fontWeight: "normal",
    // fontFamily: "Merriweather-Light",
    textAlign: "center",
    alignSelf: "center"
  }
});
