import { Platform } from "react-native";

export const colors = {
  background: "#F6F7F1",
  text: "#454546",
  tint: "#0066ff",
  accent: "#D51A5E",
  border: "#E2E3DE",
  borderBottom: "#E0E1DC",
  headerAd: "#d0d0d0"
};

export const spacing = {
  defaultMargin: 20,
  navHeaderHeight: 45,
  headerAdHeight: 40
};

export const typography = {
  fontFamily: "Merriweather-Light",
  fontSizeHeader: Platform.OS === "ios" ? 18 : 16
};

export const theme = {
  colors,
  spacing,
  typography
};
