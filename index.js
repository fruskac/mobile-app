import { AppRegistry, LogBox } from "react-native";

if (__DEV__ && LogBox && typeof LogBox.ignoreLogs === "function") {
  LogBox.ignoreLogs([
    "Require cycle: node_modules/jsan/lib/index.js",
    "Require cycle: node_modules/redux-saga/lib/internal/io.js",
    "onAnimatedValueUpdate",
    "`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.",
    "`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method."
  ]);
}

const App = require("./src/App").default;

AppRegistry.registerComponent("Fruskac", () => App);
