// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MapBox from "@mapbox/react-native-mapbox-gl";
import { Image, Text, StyleSheet, View, Dimensions } from "react-native";
import CommonStyles from "../../styles/CommonStyles";
import { LocationsList, Location } from "../../types";
import SvgUri from "react-native-svg-uri";
import * as Icons from "../../styles/Icons";
import HTML from 'react-native-render-html';
const timer = require("react-native-timer");

import exampleIcon from "../../assets/volem-logo.png";

type Props = {
};
type State = {
};

class TrackMap extends PureComponent<Props, State> {
  _map: MapBox;
  _watchPositionId: number;

  constructor(props: Props) {
    super(props);
    this.state = {
      showMap: false,
      userLocation: { lat: 0, lng: 0 }
    };
  }

  componentDidMount() {
    this._watchPositionId = navigator.geolocation.watchPosition(
      position => {
        // console.log("position", position);
        this.setState({
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    timer.setTimeout(
      "show",
      () => {
        this.setState({ showMap: true });
      },
      300
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this._watchPositionId);
    timer.clearTimeout("show");
  }

  render() {
    const coordinates = [
      {lat: 45.1848, lng: 19.82259 },
      {lat: 45.18468, lng: 19.82257 },
      {lat: 45.18468, lng: 19.82257 },
      {lat: 45.18426, lng: 19.82256 },
      {lat: 45.18412, lng: 19.82261 },
      {lat: 45.18412, lng: 19.82261 },
      {lat: 45.18402, lng: 19.82252 },
      {lat: 45.18385, lng: 19.82248 },
      {lat: 45.18372, lng: 19.82235 },
      {lat: 45.18365, lng: 19.82215 }
    ]
    return (
      <MapBox.MapView
        zoomLevel={10}
        ref={c => (this._map = c)}
        minZoom={10}
        maxZoom={13}
        compassEnabled={true}
        zoomEnabled={true}
        showUserLocation={true}
        // styleURL={"mapbox://styles/alexgvozden/cjc7l0w1y3jcr2snwkmzb8vm2"}
        centerCoordinate={[19.7093, 45.1571]}
        style={CommonStyles.container}
      >
        {coordinates.map((location, index) => (
          <MapBox.PointAnnotation
            key={index}
            id={"Map"+index}
            coordinate={[Number(location.lng), Number(location.lat)]}>
            <View style={styles.annotationContainer}>
              <SvgUri
                width={21}
                height={21}
                source={Icons["bike"]}
                fill={Icons.colors["bike"]}
              />
            </View>
            <MapBox.Callout title={location.title+', '+location.place} />
          </MapBox.PointAnnotation>
        ))}
      </MapBox.MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  }
});

export default TrackMap;
