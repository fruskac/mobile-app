/**
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MapBox from "@mapbox/react-native-mapbox-gl";
import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Navigation from "./Navigation";

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
        <Navigation />
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  }
});
