// @flow

import React, { PureComponent } from "react";
import MapBox from "@mapbox/react-native-mapbox-gl";
import { Image, TouchableOpacity, StyleSheet, View} from "react-native";
import CommonStyles from "../../styles/CommonStyles";
import * as Icons from "../../styles/Icons";
import Icon from '../../components/Icon/Icon';
const timer = require("react-native-timer");

import { easyColor, mediumColor, hardColor } from "../Trails/Styles";

type Props = {
  id: string,
  trackData: any,
  language: string,
  locationsForMap: Array<any>,
  onNavigate: (route: string) => void,
  onFetchMap: (language: string) => void,
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
      route: {
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

  async componentDidMount() {
    const { trackData } = this.props;
    this.props.onFetchMap(this.props.language === 'en' ? 'en' : 'rs');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        this.setState({ userLocation: userLocation });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000 },
    );
    timer.setTimeout(
      "show",
      () => {
        this.setState({ showMap: true });
      },
      300
    );

    this._watchPositionId = navigator.geolocation.watchPosition(
      position => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        this.setState({ userLocation: userLocation });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    await fetch(trackData.track_url)
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
        this.setState({routeStartCoordinates: coordinatesList[0]});
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
    let userLocation = [Number(this.state.userLocation.lng), Number(this.state.userLocation.lat)];
    console.disableYellowBox = true;
    const { trackData, locationsForMap } = this.props;
    let trackColor = '#f00';
    if (trackData['track_category'].toLowerCase() === 'easy') {
      trackColor = easyColor;
    } else if(trackData['track_category'].toLowerCase() === 'medium') {
      trackColor = mediumColor;
    } else if(trackData['track_category'].toLowerCase() === 'hard') {
      trackColor = hardColor;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={CommonStyles.onMapBtn}
          onPress={()=>{
            this.map.flyTo([this.state.userLocation.lng, this.state.userLocation.lat], 5500)
          }}
        >
          <Image source={require('../../assets/menu-icons-png/icons8-street-view-24.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[CommonStyles.onMapBtn,{top: 104}]}
          onPress={()=>{
            this.map.flyTo(this.state.routeStartCoordinates, 5500);
          }}
        >
          <Image source={require('../../assets/menu-icons-png/icons8-route-24.png')} />
        </TouchableOpacity>
        <MapBox.MapView
          ref={(ref) => (this.map = ref)}
          pitch={15}
          zoomLevel={16}
          minZoomLevel={10}
          maxZoomLevel={22}
          centerCoordinate={userLocation}
          style={styles.container}
          showUserLocation={true}
          surfaceView={true}
          userTrackingMode={MapBox.UserTrackingModes.FollowWithHeading}
          compassEnabled={true}
          logoEnabled={false}
        >
          {this.state.route.features[0].geometry.coordinates.length > 0 ? 
          <MapBox.ShapeSource id='line1' shape={this.state.route}>
            <MapBox.LineLayer id='linelayer1' style={{lineColor: trackColor, lineWidth: 3}} />

          </MapBox.ShapeSource>
          : null }
          {locationsForMap.map((location, index) => (
            <MapBox.PointAnnotation
              key={index}
              id={"Map"+index}
              coordinate={[Number(location.lng), Number(location.lat)]}
              >
              <View style={[CommonStyles.annotationContainerMini, {backgroundColor: Icons.colors[location['category'].replace("-", "")]}]}>
                <Icon 
                  name={[location['category'].replace("-", "")]}
                  size={15}
                  color={"#fff"}
                />
              </View>
              <MapBox.Callout title={location.title+', '+location.place} />
            </MapBox.PointAnnotation>
          ))}
        </MapBox.MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default TrackMap;
