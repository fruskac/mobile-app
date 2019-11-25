import React, { PureComponent, Fragment } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { View } from 'react-native';
import CommonStyles from '../../styles/CommonStyles';
import Styles from './Styles';
import MapCallout from '../../components/MapCallout/MapCallout';
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
    this.selectedLocation = this.props.locationsForMap.filter(loc => loc.id === this.props.id)[0];
    this.selectedIndex = this.selectedLocation.id;
    this.locations = [...this.props.locationsForMap.filter((location) => location.id != this.selectedLocation.id), this.selectedLocation];
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

  putSelectedIconOnTop = () => {
    
  }

  updateFilters = (newFilters) => {
    this.setState({ filters: newFilters });
  }

  isUserInBounds = () => this.state.userLocation && neLat >= this.state.userLocation.lat && swLat <= this.state.userLocation.lat &&
    neLng >= this.state.userLocation.lng && swLng <= this.state.userLocation.lng;

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
    const { locationsForMap, id, onNavigate } = this.props;
    const { showFilterBox, userLocation, filters } = this.state;
    //let selectedLocation = locationsForMap.filter(loc => loc.id === id)[0];
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
              onPress={() => {
                this._camera.flyTo([Number(this.selectedLocation.lng), Number(this.selectedLocation.lat)], 5500);
                this.selectedIndex = this.selectedLocation.id;
                this.forceUpdate();
              }}
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
          compassEnabled={true}
          zoomEnabled={true}
          style={CommonStyles.container}
        >
          <MapboxGL.Camera
            ref={(ref) => (this._camera = ref)}
            zoomLevel={10}
            centerCoordinate={[Number(this.selectedLocation.lng), Number(this.selectedLocation.lat)]}
            animationDuration={2000}
          />
          <MapboxGL.UserLocation />

          {this.locations.map((location, index) => (
            filters.includes(location['category']) ?
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
                      iconImage: this.getImage(location["category"]),
                      symbolZOrder: "source",
                      iconAllowOverlap:
                        this.selectedIndex === location.id,
                      iconSize:
                        this.selectedIndex === location.id || this.selectedLocation.id === location.id ? 0.57 : 0.35
                    }}
                  />
              </MapboxGL.ShapeSource>

                {(this.selectedIndex === location.id || this.selectedLocation.id === location.id) && (
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

export default MapSelectedLocation;
