import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import MapboxGL from '@react-native-mapbox-gl/maps';
import { store, persistor } from './src/store/configureStore';
import SideMenu from './src/components/Drawer/index';

import './src/I18n/I18n';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYWxleGd2b3pkZW4iLCJhIjoiY2pjN2tvM2p1MGV0dzJ3bzcwNzRpNnZ1MyJ9.6vel6zy35B2t9dB3VywO9g'
);

export default class App extends Component {
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
