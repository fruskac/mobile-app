import React, { PureComponent, Fragment } from 'react';
import MapBox from '@react-native-mapbox-gl/maps';
import { View } from 'react-native';
import CommonStyles from '../../styles/CommonStyles';
import Icon from '../../components/Icon/Icon';
import * as Icons from '../../styles/Icons';
import Styles from './Styles';
import MapCallout from '../../components/MapCallout/MapCallout';
import MapFilters from '../../components/Filters/MapFilters';
import MapButton from '../../components/MapButton/MapButton';
import { getUserLocation, setWatchPosition } from '../../store/actions/maps';

const neLat = 45.265069,
  neLng = 19.924718,
  swLat = 45.112557,
  swLng = 19.32377;

class MapSelectedLocation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: { lat: 0, lng: 0 },
      filters: ['lookouts', 'monuments', 'lakes', 'monasteries', 'picnic-areas',
        'misc', 'meadows', 'mountain-huts', 'restaurants', 'households', 'wineries'
      ],
    };
  }

  componentDidMount() {
    this.props.onFetchMap(this.props.language === 'en' ? 'en' : 'rs');
    getUserLocation(this.setUserLocation);
    this._watchPositionId = setWatchPosition(this.setUserLocation);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this._watchPositionId);
  }

  setUserLocation = (userLocation) => {
    this.setState({ userLocation: userLocation})
  }

  updateFilters = (newFilters) => {
    this.setState({ filters: newFilters });
  }

  isUserInBounds = () => this.state.userLocation && neLat >= this.state.userLocation.lat && swLat <= this.state.userLocation.lat &&
    neLng >= this.state.userLocation.lng && swLng <= this.state.userLocation.lng;

  render() {
    console.disableYellowBox = true;
    const { locationsForMap, id, onNavigate } = this.props;
    const { showFilterBox, userLocation, filters } = this.state;
    let selectedLocation = locationsForMap.filter(loc => loc.id === id)[0];
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
              iconName={'icon-marker'}
              onPress={() => this._camera.flyTo([Number(selectedLocation.lng), Number(selectedLocation.lat)], 5500)}
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
          compassEnabled={true}
          zoomEnabled={true}
          style={CommonStyles.container}
        >
          <MapBox.Camera
            ref={(ref) => (this._camera = ref)}
            zoomLevel={10}
            centerCoordinate={[Number(selectedLocation.lng), Number(selectedLocation.lat)]}
            animationDuration={2000}
          />
          <MapBox.UserLocation />

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
                <View style={(location == selectedLocation) ? [CommonStyles.annotationContainerMini, CommonStyles.selectedMarker] : [CommonStyles.annotationContainerMini, { backgroundColor: Icons.colors[location['category'].replace('-', '')] }]}>
                  <Icon
                    name={[location['category'].replace('-', '')]}
                    size={(location == selectedLocation) ? 24 : 15}
                    color={(location == selectedLocation) ? Icons.colors[location['category'].replace('-', '')] : '#fff'}
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

export default MapSelectedLocation;
