import React from 'react';
import { createStackNavigator } from 'react-navigation';
import I18n from 'react-native-i18n';

import HomeScreen from '../routes/Home';
import NewsScreen from '../routes/News';
import SingleNewsScreen from '../routes/NewsSingle';
import MapScreen from '../routes/Map';
import MapSelectedLocationScreen from '../routes/MapSelectedLocation';
import LocationsScreen from '../routes/Locations';
import LocationTypePlaceScreen from '../routes/LocationTypePlace';
import LocationSingleScreen from '../routes/LocationSingle';
import TrailsScreen from '../routes/Trails';
import TracksScreen from '../routes/Tracks';
import TrackSingleScreen from '../routes/TrackSingle';
import TrackMapScreen from '../routes/TrackMap'; 
import InfoScreen from '../routes/Info';
import InfoSingleScreen from '../routes/InfoSingle';

import BackButton from '../components/BackButton';
import MenuButton from '../components/MenuButton';
import Styles from './Styles';


export const AppNavigator = createStackNavigator({
  Home: {
    path: '/',
    screen: HomeScreen,
    navigationOptions: navigation => ({
      title: I18n.t('home'),
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle,
    })
  },
  News: {
    path: '/news',
    screen: NewsScreen,
    navigationOptions: navigation => ({
      title: I18n.t('news'),
      headerLeft: <BackButton />,
      headerRight: <MenuButton />,
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  SingleNews: {
    path: '/news/:id',
    screen: SingleNewsScreen,
    navigationOptions: navigation => ({
      title: I18n.t('news'),
      headerLeft: <BackButton />,
      headerRight: <MenuButton />,
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  Map: {
    path: '/map',
    screen: MapScreen,
    navigationOptions: navigation => ({
      title: I18n.t('map'),
      headerLeft: <BackButton />,
      headerRight: <MenuButton />,
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  MapSelectedLocation: {
    path: '/map/:id',
    screen: MapSelectedLocationScreen,
    navigationOptions: navigation => ({
      title: I18n.t('map'),
      headerLeft: <BackButton />,
      headerRight: <MenuButton />,
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  Locations: {
    path: '/locations',
    screen: LocationsScreen,
    navigationOptions: navigation => ({
      title: I18n.t('locations'),
      headerLeft: <BackButton />,
      headerRight: <MenuButton />,
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  LocationTypePlace: {
    path: '/location/:id',
    screen: LocationTypePlaceScreen,
    navigationOptions: navigation => {
      const en = require('../I18n/en.json');
      const sr = require('../I18n/sr.json');
      let key = navigation.navigation.state.params.id;
      if (key in en || key in sr) {
        key = I18n.t(navigation.navigation.state.params.id);
      }
      return {
        title: key,
        headerLeft: <BackButton />,
        headerRight: <MenuButton />,
        headerStyle: Styles.header,
        headerTitleStyle: Styles.headerTitle
      };
    }
  },
  LocationSingle: {
    path: '/location-single/:id',
    screen: LocationSingleScreen,
    navigationOptions: navigation => {
      return {
        title: I18n.t('location'),
        headerLeft: <BackButton />,
        headerRight: <MenuButton />,
        headerStyle: Styles.header,
        headerTitleStyle: Styles.headerTitle
      };
    }
  },
  Trails: {
    path: '/trails',
    screen: TrailsScreen,
    navigationOptions: navigation => ({
      title: I18n.t('trails'),
      headerLeft: <BackButton />,
      headerRight: <MenuButton />,
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  Tracks: {
    path: '/tracks/:category/:type',
    screen: TracksScreen,
    navigationOptions: navigation => ({
      title: I18n.t(navigation.navigation.state.params.category) + ' ' + I18n.t('tracks').toLowerCase(),
      headerLeft: <BackButton />,
      headerRight: <MenuButton />,
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  TrackSingle: {
    path: '/track-single/:id',
    screen: TrackSingleScreen,
    navigationOptions: navigation => {
      return {
        title: I18n.t('tracks'),
        headerLeft: <BackButton />,
        headerRight: <MenuButton />,
        headerStyle: Styles.header,
        headerTitleStyle: Styles.headerTitle
      };
    }
  },
  TrackMap: {
    path: '/track-map/:id',
    screen: TrackMapScreen,
    navigationOptions: navigation => {
      return {
        title: I18n.t('tracks'),
        headerLeft: <BackButton />,
        headerRight: <MenuButton />,
        headerStyle: Styles.header,
        headerTitleStyle: Styles.headerTitle,
      };
    }
  },
  Info: {
    path: '/info',
    screen: InfoScreen,
    navigationOptions: navigation => ({
      title: I18n.t('info'),
      headerLeft: <BackButton />,
      headerRight: <MenuButton />,
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  InfoSingle: {
    path: '/info-single/:id',
    screen: InfoSingleScreen,
    navigationOptions: navigation => {
      return {
        title: I18n.t('info'),
        headerLeft: <BackButton />,
        headerRight: <MenuButton />,
        headerStyle: Styles.header,
        headerTitleStyle: Styles.headerTitle
      };
    }
  }
},
{
  defaultNavigationOptions: {
    gesturesEnabled: false,
  }
});