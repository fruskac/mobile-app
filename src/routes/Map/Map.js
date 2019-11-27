import React, { PureComponent, Fragment } from "react";
import { View, StyleSheet, DeviceEventEmitter, Platform } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Styles from "./Styles";
import MapCallout from "../../components/MapCallout/MapCallout";
import MapFilters from "../../components/Filters/MapFilters";
import MapButton from "../../components/MapButton/MapButton";
import miscImage from "../../assets/icons-png/misc.png";
import lakesImage from "../../assets/icons-png/lakes.png";
import lookoutsImage from "../../assets/icons-png/lookouts.png";
import monumentsImage from "../../assets/icons-png/monuments.png";
import monasteriesImage from "../../assets/icons-png/monasteries.png";
import picnicAreasImage from "../../assets/icons-png/picnic-areas.png";
import meadowsImage from "../../assets/icons-png/meadows.png";
import restaurantsImage from "../../assets/icons-png/restaurants.png";
import householdsImage from "../../assets/icons-png/households.png";
import markerImage from "../../assets/icons-png/marker_icon.png";
import { getUserLocation, setWatchPosition } from "../../store/actions/maps";
import CommonStyles from "../../styles/CommonStyles";
import ReactNativeHeading  from 'react-native-heading';
import I18n from "react-native-i18n";

const ANNOTATION_SIZE = 45;

const styles = StyleSheet.create({
  annotationContainer: {
    width: ANNOTATION_SIZE,
    height: ANNOTATION_SIZE,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: ANNOTATION_SIZE / 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0, 0, 0, 0.45)"
  },
  annotationFill: {
    width: ANNOTATION_SIZE - 3,
    height: ANNOTATION_SIZE - 3,
    borderRadius: (ANNOTATION_SIZE - 3) / 2,
    backgroundColor: "orange",
    transform: [{ scale: 0.6 }]
  }
});

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: { lat: 0, lng: 0 },
      showFilterBox: false,
      filters: [
        "lookouts",
        "monuments",
        "lakes",
        "monasteries",
        "picnic-areas",
        "misc",
        "meadows",
        "mountain-huts",
        "restaurants",
        "households",
        "wineries"
      ],
    };
    this.selectedIndex = null  
  }

  componentDidMount() {
    this.props.onFetchMap(this.props.language === "en" ? "en" : "rs");
    getUserLocation(this.setUserLocation, Platform.OS != 'ios');
    this._watchPositionId = setWatchPosition(this.setUserLocation);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this._watchPositionId);
  }

  setUserLocation = userLocation => {
    this.setState({ userLocation: userLocation });
  };

  updateFilters = newFilters => {
    this.setState({ filters: newFilters });
  };

  getImage = value => {
    let image = null;
    switch (value) {
      case "lakes":
        image = lakesImage;
        break;
      case "misc":
        image = miscImage;
        break;
      case "lookouts":
        image = lookoutsImage;
        break;
      case "monuments":
        image = monumentsImage;
        break;
      case "monasteries":
        image = monasteriesImage;
        break;
      case "picnic-areas":
        image = picnicAreasImage;
        break;
      case "meadows":
        image = meadowsImage;
        break;
      case "restaurants":
        image = restaurantsImage;
        break;
      case "households":
        image = householdsImage;
        break;
      default:
        image = miscImage;
    }
    return image;
  };

  render() {
    console.disableYellowBox = true;
    const { onNavigate, locationsForMap, orientation } = this.props;
    const { showFilterBox, userLocation, filters } = this.state;
    return (
      <View style={Styles.container}>
        <MapButton
          iconName={"icon-menu"}
          onPress={() => this.setState({ showFilterBox: !showFilterBox })}
          styles={CommonStyles.onMapBtn}
        />
        {showFilterBox ? null : (
          <MapButton
            iconName={"icon-current"}
            onPress={() => {
              this._camera.flyTo(
                [Number(userLocation.lng), Number(userLocation.lat)],
                5500
              );
            }
            }
            styles={[CommonStyles.onMapBtn, Styles.currentPosition]}
          />
        )}
        {showFilterBox ? (
          <MapFilters
            activeFilters={filters}
            updateActiveFilters={this.updateFilters}
          />
        ) : null}
        <MapboxGL.MapView
          pitch={15}
          compassEnabled={true}
          zoomEnabled={true}
          showUserLocation={true}
          style={CommonStyles.container}
          ref={value => this._mapView = value}
        >
          <MapboxGL.Camera
            ref={ref => (this._camera = ref)}
            zoomLevel={10}
            centerCoordinate={[19.7093, 45.1571]}
          />
          <MapboxGL.UserLocation 
              renderMode={'custom'}
          >
            <MapboxGL.SymbolLayer
              id={`ownPosition-symbol`}
              style={{
                iconImage: markerImage,
                iconSize: 0.4,
                iconRotate: orientation,
                iconRotationAlignment: 'map',
                iconAllowOverlap: true,
              }}
            />
         </MapboxGL.UserLocation>
          {locationsForMap.map((location, index) =>
            filters.includes(location['category']) ? (
              <Fragment>
                <MapboxGL.ShapeSource
                  id={"Map" + index}
                  key={index}
                  onPress={() => {
                    this.selectedIndex = location.id;
                    this.forceUpdate();
                  }}
                  shape={{
                    type: "Feature",
                    id: index,
                    geometry: {
                      type: "Point",
                      coordinates: [Number(location.lng), Number(location.lat)]
                    }
                  }}
                >
                  <MapboxGL.SymbolLayer
                    id={location.id}
                    style={{
                      iconImage: this.getImage(location['category']),
                      iconAllowOverlap:
                        this.selectedIndex === location.id,
                      iconSize:
                        this.selectedIndex === location.id ? 0.57 : 0.35
                    }}
                  />

                </MapboxGL.ShapeSource>

                {this.selectedIndex === location.id && (
                  <MapboxGL.PointAnnotation
                    ref={(value) => this._point = value}
                    key={index + location.id}
                    id={"Point" + location.id}
                    coordinate={[Number(location.lng), Number(location.lat)]}
                    onSelected={() => this._camera.moveTo(
                      [Number(location.lng), Number(location.lat)],
                      3000
                    )}
                    style={{
                      opacity: this.selectedIndex === location.id ? 0 : 1
                    }}
                    onDeselected={() => {
                      this.selectedIndex = null; 
                      this.forceUpdate();
                    }}
                    title={location.title}
                  >
                    <MapCallout
                      image={location.image}
                      title={location.title}
                      place={location.place}
                      onPress={() => {
                        onNavigate("/location-single/" + Number(location.id));
                      }}
                    />
                  </MapboxGL.PointAnnotation>
                )}
              </Fragment>
            ) : null
          )}
        </MapboxGL.MapView>
      </View>
    );
  }
}

export default Map;
