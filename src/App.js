/**
 * @flow
 */

import React, { Component } from "react";
import { LogBox } from "react-native";

import { Provider } from "react-redux";
import MapBox from "./maps/mapboxSafe";
import { ENV } from "./config/env";

import "./I18n/I18n"; // keep before RootContainer

import { store } from "./store/configureStore";
import AppWithActions from "./AppWithActions";

const mapboxAccessToken =
  ENV && typeof ENV.MAPBOX_ACCESS_TOKEN === "string"
    ? ENV.MAPBOX_ACCESS_TOKEN.trim()
    : "";

if (
  MapBox &&
  typeof MapBox.setAccessToken === "function" &&
  mapboxAccessToken.length > 0
) {
  MapBox.setAccessToken(mapboxAccessToken);
}

if (__DEV__ && LogBox && typeof LogBox.ignoreLogs === "function") {
  LogBox.ignoreLogs([
    "RCTBridge required dispatch_sync to load RCTDevLoadingView. This may lead to deadlocks",
    "componentWillMount has been renamed",
    "componentWillReceiveProps has been renamed",
    "YellowBox has been replaced with LogBox",
    "AsyncStorage has been extracted from react-native core",
    "Require cycle: node_modules/jsan/lib/index.js",
    "Require cycle: node_modules/redux-saga/lib/internal/io.js",
    "onAnimatedValueUpdate",
    "SafeAreaView has been deprecated and will be removed in a future release",
    "`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.",
    "`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method."
  ]);
}

if (__DEV__ && typeof console !== "undefined" && typeof console.warn === "function") {
  if (!global.__FRUSKAC_WARN_FILTER_INSTALLED__) {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      const first = args && args.length > 0 ? args[0] : "";
      const message = typeof first === "string" ? first : "";
      if (
        message.indexOf(
          "SafeAreaView has been deprecated and will be removed in a future release"
        ) !== -1
      ) {
        return;
      }
      originalWarn(...args);
    };
    global.__FRUSKAC_WARN_FILTER_INSTALLED__ = true;
  }
}

class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppWithActions />
      </Provider>
    );
  }
}

export default App;
