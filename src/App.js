/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import MapBox from "@mapbox/react-native-mapbox-gl";
import { StackNavigator } from "react-navigation";

MapBox.setAccessToken(
  "pk.eyJ1IjoiYWxleGd2b3pkZW4iLCJhIjoiY2pjN2tvM2p1MGV0dzJ3bzcwNzRpNnZ1MyJ9.6vel6zy35B2t9dB3VywO9g"
);

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

class App extends Component<{}> {
  static navigationOptions = {
    title: "Welcome"
  };
  render() {
    return <Text>Hello, Navigation!</Text>;
  }
  // render() {

  //   return (
  //     <View style={styles.container}>
  //       <MapBox.MapView
  //         zoomLevel={12}
  //         minZoom={12}
  //         maxZoom={13}
  //         styleURL={"mapbox://styles/alexgvozden/cjc7l0w1y3jcr2snwkmzb8vm2"}
  //         centerCoordinate={[19.7093, 45.1571]}
  //         style={styles.container}
  //       />
  //     </View>
  //   );
  // }
}

export default (SimpleApp = StackNavigator({
  Home: { screen: App }
}));

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  }
});
