/**
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MapBox from "@mapbox/react-native-mapbox-gl";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";

import "./I18n/I18n"; // keep before RootContainer

import configureStore from "./store/configureStore";
import Navigation from "./navigators/Navigation";
import Drawer from "./components/Drawer/";
import Styles from "./Styles";

MapBox.setAccessToken(
  "pk.eyJ1IjoiYWxleGd2b3pkZW4iLCJhIjoiY2pjN2tvM2p1MGV0dzJ3bzcwNzRpNnZ1MyJ9.6vel6zy35B2t9dB3VywO9g"
);

// Store & Router
const store = configureStore({});

class App extends Component<{}> {
  static navigationOptions = {
    title: "Welcome"
  };
  render() {
    return (
      <Provider store={store}>
        <View
          style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
        >
          <Navigation />
          <Drawer />
        </View>
      </Provider>
    );
  }
}

export default App;
