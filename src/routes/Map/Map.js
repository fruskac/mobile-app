// @flow

import React, { PureComponent } from "react";
import MapBox from "@mapbox/react-native-mapbox-gl";
import { View } from "react-native";
import CommonStyles from "../../styles/CommonStyles";
import { Location } from "../../types";
import Icon from '../../components/Icon/Icon';
import * as Icons from "../../styles/Icons";

const timer = require("react-native-timer");

type Props = {
  language: string,
  onNavigate: (route: string) => void,
  onFetchMap: (language: string) => void,
  locationsForMap: Array<any>,
};
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
    this.props.onFetchMap(this.props.language === 'en' ? 'en' : 'rs');
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
    const { locationsForMap, onNavigate } = this.props;
    
    if (!this.state.showMap) return null;
    return (
      <MapBox.MapView
        pitch={15}
        zoomLevel={18}
        ref={c => (this._map = c)}
        minZoomLevel={12}
        maxZoomLevel={21}
        compassEnabled={true}
        zoomEnabled={true}
        showUserLocation={true}
        centerCoordinate={[19.7093, 45.1571]}
        style={CommonStyles.container}
        userTrackingMode={MapBox.UserTrackingModes.FollowWithHeading}
      >
        {locationsForMap.map((location, index) => (
          <MapBox.PointAnnotation
            key={index}
            id={"Map"+index}
            coordinate={[Number(location.lng), Number(location.lat)]}
            onSelected={()=>{
              onNavigate("/location-single/" + Number(location.id))
            }}>
            <View style={[CommonStyles.annotationContainer,{backgroundColor: Icons.colors[location['category'].replace("-", "")]}]}>
              <Icon 
                name={[location['category'].replace("-", "")]}
                size={18}
                color='#fff'
              />
            </View>
            <MapBox.Callout title={location.title+', '+location.place} />
          </MapBox.PointAnnotation>
        ))}
      </MapBox.MapView>
    );
  }
}

export default Map;
