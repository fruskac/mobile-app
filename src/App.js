/**
 * @flow
 */

import React, { Component } from "react";

import { StackNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import MapBox from "@mapbox/react-native-mapbox-gl";
import SideMenu from "./components/Drawer";

import "./I18n/I18n"; // keep before RootContainer

import { store, persistor } from "./store/configureStore";
import AppWithActions from "./AppWithActions";

MapBox.setAccessToken(
  "pk.eyJ1IjoiYWxleGd2b3pkZW4iLCJhIjoiY2pjN2tvM2p1MGV0dzJ3bzcwNzRpNnZ1MyJ9.6vel6zy35B2t9dB3VywO9g"
);

class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SideMenu />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
