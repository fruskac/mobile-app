// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MapBox from "@mapbox/react-native-mapbox-gl";
import { Text } from "react-native";
import CommonStyles from "../../styles/CommonStyles";
import { LocationsList, Location } from "../../types";
const timer = require("react-native-timer");

import exampleIcon from "../../assets/volem-logo.png";

import {
  miscMap,
  springsMap,
  picnicareasMap,
  monumentsMap,
  lakesMap,
  monasteriesMap,
  lookoutsMap,
  meadowsMap,
  waterfallsMap,
  fishpondsMap
} from "../../styles/Icons";

type Props = {
  locations: LocationsList,
  tags: Array<string>
};
type State = {
  showMap: boolean,
  userLocation: Location
};

const featureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "volem1",
      properties: {
        icon: "example"
      },
      geometry: {
        type: "Point",
        coordinates: [19.8093, 45.1571]
      }
    },
    {
      type: "Feature",
      id: "volem2",
      properties: {
        icon: "example"
      },
      geometry: {
        type: "Point",
        coordinates: [19.7093, 45.1571]
      }
    }
  ]
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
    const { locations, tags } = this.props;
    console.log("locations", locations);
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
      >
        <MapBox.ShapeSource
          id="exampleShapeSource"
          shape={locations}
          images={{
            example: exampleIcon,
            miscMap,
            springsMap,
            picnicareasMap,
            monumentsMap,
            lakesMap,
            monasteriesMap,
            lookoutsMap,
            meadowsMap,
            waterfallsMap,
            fishpondsMap
          }}
          onPress={el => {
            console.log(el);
          }}
        >
          {tags.map((tag, index) => (
            <MapBox.SymbolLayer
              key={index}
              id={tag + "Map"}
              style={{ iconImage: tag + "Map", iconSize: 0.33 }}
            />
          ))}
        </MapBox.ShapeSource>
      </MapBox.MapView>
    );
  }
}

export default Map;
