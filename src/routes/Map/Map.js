import React, { PureComponent } from 'react';
import MapBox from '@react-native-mapbox-gl/maps';
import { View } from 'react-native';
import CommonStyles from '../../styles/CommonStyles';
import * as Icons from '../../styles/Icons';
import Icon from '../../components/Icon/Icon';
import Styles from './Styles';
import MapCallout from '../../components/MapCallout/MapCallout';
import MapFilters from '../../components/Filters/MapFilters';
import MapButton from '../../components/MapButton/MapButton';
import { getUserLocation, setWatchPosition } from '../../store/actions/maps';

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: { lat: 0, lng: 0 },
      showFilterBox: false,
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

  render() {
    console.disableYellowBox = true;
    const { onNavigate, locationsForMap } = this.props;
    const { showFilterBox, userLocation, filters } = this.state;
    return (
      <View style={Styles.container}>
        <MapButton
          iconName={'icon-menu'}
          onPress={() => this.setState({ showFilterBox: !showFilterBox })}
          styles={CommonStyles.onMapBtn}
        />
        {showFilterBox ? null :
          <MapButton
            iconName={'icon-current'}
            onPress={() => this._camera.flyTo([Number(userLocation.lng), Number(userLocation.lat)], 5500)}
            styles={[CommonStyles.onMapBtn, Styles.currentPosition]}
          />
        }
        {showFilterBox ?
          <MapFilters
            activeFilters={filters}
            updateActiveFilters={this.updateFilters}
          />
          : null}
        <MapBox.MapView
          pitch={15}
          compassEnabled={true}
          zoomEnabled={true}
          showUserLocation={true}
          style={CommonStyles.container}
        >
          <MapBox.Camera
            ref={(ref) => (this._camera = ref)}
            zoomLevel={10}
            centerCoordinate={[19.7093, 45.1571]}
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
                title={location.title}
              >
                <View style={[CommonStyles.annotationContainer, { backgroundColor: Icons.colors[location['category'].replace('-', '')] }]}>
                  <Icon
                    name={[location['category'].replace('-', '')]}
                    size={18}
                    color='#fff'
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

export default Map;
