// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MapBox from "@mapbox/react-native-mapbox-gl";
import { Image, Text, StyleSheet, View } from "react-native";
import CommonStyles from "../../styles/CommonStyles";
import { LocationsList, Location } from "../../types";
import SvgUri from "react-native-svg-uri";
import * as Icons from "../../styles/Icons";
const timer = require("react-native-timer");

import exampleIcon from "../../assets/volem-logo.png";

type Props = {
  // locationsForMap: LocationsList,
  language: string,
  tags: Array<string>,
  onNavigate: (route: string) => void,
  onFetchMap: (language: string) => void,
  locationsForMap: Array<any>,
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
    this.props.onFetchMap(this.props.language === 'en' ? 'en' : 'rs', 0);
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
    const { locationsForMap, tags, onNavigate, language } = this.props;
    
    if (!this.state.showMap) return null;
    // return (<Text>{JSON.stringify(locationsForMap)}</Text>);
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
        {locationsForMap.map((location, index) => (
          <MapBox.PointAnnotation
            key={index}
            id={"Map"+index}
            coordinate={[Number(location.lng), Number(location.lat)]}
            onSelected={()=>{
              onNavigate("/location-single/"+Number(location.id)) // ("/trails")
            }}>
            <View style={styles.annotationContainer}>
              <SvgUri
                width={21}
                height={21}
                source={Icons[location['category'].replace("-", "")]}
                fill={Icons.colors[location['category'].replace("-", "")]}
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
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  }
});

export default Map;
