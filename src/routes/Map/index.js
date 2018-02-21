// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MapBox from "@mapbox/react-native-mapbox-gl";
import { Text } from "react-native";
import CommonStyles from "../../styles/CommonStyles";
const timer = require("react-native-timer");

type Location = {
  lat: number,
  lng: number
};

type Props = {};
type State = {
  showMap: boolean,
  userLocation: Location
};

class Map extends PureComponent<Props, State> {
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

    // show map only after navigator animation finishes
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
    if (!this.state.showMap) return null;
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
      />
    );
  }
}

export default Map;
