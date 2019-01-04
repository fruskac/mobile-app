// @flow

import React, { PureComponent } from "react";
import MapBox from "@mapbox/react-native-mapbox-gl";
import { Image, TouchableOpacity, View } from "react-native";
import CommonStyles from "../../styles/CommonStyles";
import { Location } from "../../types";
import Icon from '../../components/Icon/Icon';
import * as Icons from "../../styles/Icons";
const timer = require("react-native-timer");

type Props = {
  id: string,
  language: string,
  onNavigate: (route: string) => void,
  onFetchMap: (language: string) => void,
  locationsForMap: Array<any>,
};
type State = {
  showMap: boolean,
  userLocation: Location
};

class MapSelectedLocation extends PureComponent<Props, State> {
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
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
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
    console.disableYellowBox = true;
    const { locationsForMap, id } = this.props;
    let selectedLocation = locationsForMap.filter(loc => loc.id === id)[0];
    if (!this.state.showMap) return null;
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={CommonStyles.onMapBtn}
          onPress={()=>{
            this.map.flyTo([Number(selectedLocation.lng), Number(selectedLocation.lat)], 5500);
          }}
        >
          <Image source={require('../../assets/menu-icons-png/icons8-marker-24.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[CommonStyles.onMapBtn,{top: 104}]}
          onPress={()=>{
            this.map.flyTo([Number(this.state.userLocation.lng), Number(this.state.userLocation.lat)], 5500)
          }}
        >
          <Image source={require('../../assets/menu-icons-png/icons8-street-view-24.png')} />
        </TouchableOpacity>
        <MapBox.MapView
          zoomLevel={15}
          ref={(ref) => (this.map = ref)}
          minZoomLevel={12}
          maxZoomLevel={21}
          compassEnabled={true}
          zoomEnabled={true}
          showUserLocation={true}
          centerCoordinate={[Number(selectedLocation.lng), Number(selectedLocation.lat)]}
          style={CommonStyles.container}
          userTrackingMode={MapBox.UserTrackingModes.FollowWithHeading}
        >
          {locationsForMap.map((location, index) => (
            <MapBox.PointAnnotation
              key={index}
              id={"Map"+index}
              coordinate={[Number(location.lng), Number(location.lat)]}
              >
              <View style={(location == selectedLocation) ? [CommonStyles.annotationContainerMini, CommonStyles.selectedMarker] : [CommonStyles.annotationContainerMini, {backgroundColor: Icons.colors[location['category'].replace("-", "")]}]}>
                <Icon 
                  name={[location['category'].replace("-", "")]}
                  size={(location == selectedLocation) ? 24 : 15}
                  color={(location == selectedLocation) ? Icons.colors[location['category'].replace("-", "")] : "#fff"}
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

export default MapSelectedLocation;
