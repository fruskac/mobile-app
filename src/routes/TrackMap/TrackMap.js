// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MapBox from "@mapbox/react-native-mapbox-gl";
import { Image, Text, StyleSheet, View, Dimensions } from "react-native";
import CommonStyles from "../../styles/CommonStyles";
import { LocationsList, Location } from "../../types";
import SvgUri from "react-native-svg-uri";
import * as Icons from "../../styles/Icons";
const timer = require("react-native-timer");

import exampleIcon from "../../assets/volem-logo.png";

type Props = {
  id: string,
  data: any,
  onNavigate: (route: string) => void,
  language: string,
};
type State = {
};

class TrackMap extends PureComponent<Props, State> {
  _map: MapBox;
  _watchPositionId: number;

  constructor() {
    super();
    this.state = {
      showMap: false,
      userLocation: { lat: 0, lng: 0 },
      route:
        {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": []
              }
            }
          ]
        },   
    }
  }

  componentDidMount() {
    const { data } = this.props;
    this._watchPositionId = navigator.geolocation.watchPosition(
      position => {
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

    fetch(data.track_url)
      .then(response => response.text())
      .then(data => {
        const XMLParser = require('react-xml-parser');
        let xml = new XMLParser().parseFromString(data);
        const trkptList = xml.getElementsByTagName('trkseg')[0].children;
        let coordinatesList = [];
        trkptList.forEach(element => {
          let latLngPair = [Number(element.attributes.lon), Number(element.attributes.lat)];
          coordinatesList.push(latLngPair);
        });

        this.setState({data: JSON.stringify(coordinatesList)});
        this.setState({route:
        {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": coordinatesList
              }
            }
          ]
        }
        });
      });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this._watchPositionId);
    timer.clearTimeout("show");
  }

  render() {
    return (
      <View style={styles.container}>
        <MapBox.MapView
          styleURL={MapBox.StyleURL.Light}
          zoomLevel={15}
          centerCoordinate={[19.82013, 45.1839]}
          style={styles.container}
          showUserLocation={true}
          surfaceView={true}
        > 
          <MapBox.ShapeSource id='line1' shape={this.state.route}>
            <MapBox.LineLayer id='linelayer1' style={{lineColor:'red', lineWidth: 3}} />
          </MapBox.ShapeSource>

        </MapBox.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TrackMap;
