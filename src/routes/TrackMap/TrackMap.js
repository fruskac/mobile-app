import React, { PureComponent, Fragment } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { View, Platform } from 'react-native';
import CommonStyles from '../../styles/CommonStyles';
import MapCallout from '../../components/MapCallout/MapCallout';
import { easyColor, mediumColor, hardColor } from '../Trails/Styles';
import MapFilters from '../../components/Filters/MapFilters';
import MapButton from '../../components/MapButton/MapButton';
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
import { getUserLocation, getTrack, setWatchPosition } from '../../store/actions/maps';

import Styles from './Styles';

const neLat = 45.265069,
  neLng = 19.924718,
  swLat = 45.112557,
  swLng = 19.32377;

class TrackMap extends PureComponent {
  constructor() {
    super();
    this.state = {
      userLocation: { lat: 0, lng: 0 },
      routeCenterCoordinate: [],
      route: {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': []
            }
          }
        ]
      },
      filters: ['lookouts', 'monuments', 'lakes', 'monasteries', 'picnic-areas',
        'misc', 'meadows', 'mountain-huts', 'restaurants', 'households', 'wineries'
      ],
    }
  }

  async componentDidMount() {
    const { trackData } = this.props;
    this.props.onFetchMap(this.props.language === 'en' ? 'en' : 'rs');
    getUserLocation(this.setUserLocation, Platform.OS != 'ios');
    await getTrack(trackData.track_url, this.setRouteCenterCoordinate, this.setCoordinates);
    this._watchPositionId = setWatchPosition(this.setUserLocation);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this._watchPositionId);
  }

  setUserLocation = (userLocation) => {
    this.setState({ userLocation: userLocation})
  }

  setRouteCenterCoordinate = (centerCoords) => {
    this.setState({ routeCenterCoordinate: centerCoords });
  }

  setCoordinates = (coordinates) => {
    this.setState({
      route:
      {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': coordinates
            }
          }
        ]
      }
    });
  }

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

  updateFilters = (newFilters) => {
    this.setState({ filters: newFilters });
  }

  isUserInBounds = () => this.state.userLocation && neLat >= this.state.userLocation.lat && swLat <= this.state.userLocation.lat &&
    neLng >= this.state.userLocation.lng && swLng <= this.state.userLocation.lng;

  render() {
    console.disableYellowBox = true;
    const { trackData, locationsForMap, onNavigate, orientation } = this.props;
    const { showFilterBox, filters, routeCenterCoordinate, userLocation, route } = this.state;
    console.log('coordinates: ', routeCenterCoordinate[0]);
    let trackColor = '#f00';
    if (trackData['track_category'].toLowerCase() === 'easy') {
      trackColor = easyColor;
    } else if (trackData['track_category'].toLowerCase() === 'medium') {
      trackColor = mediumColor;
    } else if (trackData['track_category'].toLowerCase() === 'hard') {
      trackColor = hardColor;
    }
    return (
      <View style={Styles.container}>
        <MapButton
          iconName={'icon-menu'}
          onPress={() => this.setState({ showFilterBox: !showFilterBox })}
          styles={CommonStyles.onMapBtn}
        />
        {showFilterBox ? null :
          <Fragment>
            <MapButton
              iconName={'icon-start'}
              onPress={() => this._camera.flyTo(routeCenterCoordinate, 5500)}
              styles={[CommonStyles.onMapBtn, { top: 101 }]}
            />
            <MapButton
              iconName={'icon-current'}
              onPress={() => this._camera.flyTo([userLocation.lng, userLocation.lat], 5500)}
              styles={[CommonStyles.onMapBtn, { top: 148 }]}
            />
          </Fragment>
        }
        {showFilterBox ?
          <MapFilters
            activeFilters={filters}
            updateActiveFilters={this.updateFilters}
          />
          : null}
        <MapboxGL.MapView
          ref={(ref) => (this.map = ref)}
          pitch={15}
          style={Styles.container}
          surfaceView={true}
          compassEnabled={true}
          logoEnabled={false}
        >
          <MapboxGL.Camera
            ref={(ref) => (this._camera = ref)}
            zoomLevel={12}
            centerCoordinate={routeCenterCoordinate != [] ? (routeCenterCoordinate[0] && routeCenterCoordinate[1] ? [Number(routeCenterCoordinate[0]), Number(routeCenterCoordinate[1])]: [19.7093, 45.1571]) : [19.7093, 45.1571]}
            //centerCoordinate={[19.7093, 45.1571]}
            animationDuration={2000}
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

          {route.features[0].geometry.coordinates.length > 0 ?
            <MapboxGL.ShapeSource id='line1' shape={route}>
              <MapboxGL.LineLayer id='linelayer1' style={{ lineColor: trackColor, lineWidth: 3 }} />
            </MapboxGL.ShapeSource>
            : null}
          {locationsForMap.map((location, index) => (
            filters.includes(location['category']) ?

            <Fragment>
                <MapboxGL.ShapeSource
                  id={"Map" + index}
                  key={index}
                  onPress={() => {
                    //this.setState({selectedIndex: location.id});
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
                    aboveLayerID="linelayer1"
                    style={{
                      iconImage: this.getImage(location["category"]),
                      symbolZOrder: "source",
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
              : null
          ))}
        </MapboxGL.MapView>
      </View>
    );
  }
}

export default TrackMap;