import React, { PureComponent, Fragment } from 'react';
import MapBox from '@react-native-mapbox-gl/maps';
import { View } from 'react-native';
import CommonStyles from '../../styles/CommonStyles';
import * as Icons from '../../styles/Icons';
import Icon from '../../components/Icon/Icon';
import MapCallout from '../../components/MapCallout/MapCallout';
import { easyColor, mediumColor, hardColor } from '../Trails/Styles';
import MapFilters from '../../components/Filters/MapFilters';
import MapButton from '../../components/MapButton/MapButton';
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
    getUserLocation(this.setUserLocation);
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

  updateFilters = (newFilters) => {
    this.setState({ filters: newFilters });
  }

  isUserInBounds = () => this.state.userLocation && neLat >= this.state.userLocation.lat && swLat <= this.state.userLocation.lat &&
    neLng >= this.state.userLocation.lng && swLng <= this.state.userLocation.lng;

  render() {
    console.disableYellowBox = true;
    const { trackData, locationsForMap, onNavigate } = this.props;
    const { showFilterBox, filters, routeCenterCoordinate, userLocation, route } = this.state;
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
        <MapBox.MapView
          ref={(ref) => (this.map = ref)}
          pitch={15}
          style={Styles.container}
          surfaceView={true}
          compassEnabled={true}
          logoEnabled={false}
        >
          <MapBox.Camera
            ref={(ref) => (this._camera = ref)}
            zoomLevel={12}
            centerCoordinate={routeCenterCoordinate}
            animationDuration={2000}
          />
          <MapBox.UserLocation />
          {route.features[0].geometry.coordinates.length > 0 ?
            <MapBox.ShapeSource id='line1' shape={route}>
              <MapBox.LineLayer id='linelayer1' style={{ lineColor: trackColor, lineWidth: 3 }} />
            </MapBox.ShapeSource>
            : null}
          {locationsForMap.map((location, index) => (
            filters.includes(location['category']) ?
              <MapBox.PointAnnotation
                key={index}
                id={'Map' + index}
                coordinate={[Number(location.lng), Number(location.lat)]}
                onSelected={() => {
                  this._camera.moveTo([Number(location.lng), (Number(location.lat))], 3000);
                }}
              >
                <View style={[CommonStyles.annotationContainerMini, { backgroundColor: Icons.colors[location['category'].replace('-', '')] }]}>
                  <Icon
                    name={[location['category'].replace('-', '')]}
                    size={15}
                    color={'#fff'}
                  />
                </View>
                <MapCallout
                  image={location.image}
                  title={location.title}
                  place={location.place}
                  onPress={() => { onNavigate('/location-single/' + Number(location.id)); }}
                />
              </MapBox.PointAnnotation>
              : null
          ))}
        </MapBox.MapView>
      </View>
    );
  }
}

export default TrackMap;