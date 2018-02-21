// @flow

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addNavigationHelpers,
  StackNavigator,
  DrawerNavigator
} from "react-navigation";
import I18n from "react-native-i18n";

import HomeScreen from "../routes/Home";
import NewsScreen from "../routes/News";
import SingleNewsScreen from "../routes/NewsSingle";
import MapScreen from "../routes/Map";
import LocationsScreen from "../routes/Locations";
import LocationTypePlaceScreen from "../routes/LocationTypePlace";
import LocationSingleScreen from "../routes/LocationSingle";
import TrailsScreen from "../routes/Trails";
import InfoScreen from "../routes/Info";
import DonateScreen from "../routes/Donate";
import Styles from "./Styles";

import BackButton from "../components/BackButton";
import MenuButton from "../components/MenuButton";

export const AppNavigator = StackNavigator({
  Home: {
    path: "/",
    screen: HomeScreen,
    navigationOptions: navigation => ({
      title: I18n.t("home"),
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  News: {
    path: "/news",
    screen: NewsScreen,
    navigationOptions: navigation => ({
      title: I18n.t("news"),
      headerLeft: <BackButton />,
      headerRight: <MenuButton />,
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  Map: {
    path: "/map",
    screen: MapScreen,
    navigationOptions: navigation => ({
      title: I18n.t("map"),
      headerLeft: <BackButton />,
      headerRight: <MenuButton />,
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  SingleNews: {
    path: "/news/:id",
    screen: SingleNewsScreen,
    navigationOptions: navigation => ({
      title: I18n.t("news"),
      headerLeft: <BackButton />,
      headerRight: <MenuButton />,
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  Locations: {
    path: "/locations",
    screen: LocationsScreen,
    navigationOptions: navigation => ({
      title: I18n.t("locations"),
      headerLeft: <BackButton />,
      headerRight: <MenuButton />,
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  LocationTypePlace: {
    path: "/location/:id",
    screen: LocationTypePlaceScreen,
    navigationOptions: navigation => {
      console.log("NAVIGATION", navigation);
      return {
        title: I18n.t(navigation.navigation.state.params.id),
        headerLeft: <BackButton />,
        headerRight: <MenuButton />,
        headerStyle: Styles.header,
        headerTitleStyle: Styles.headerTitle
      };
    }
  },
  LocationSingle: {
    path: "/location-single/:id",
    screen: LocationSingleScreen,
    navigationOptions: navigation => {
      console.log("NAVIGATION", navigation);
      return {
        title: I18n.t("location"),
        headerLeft: <BackButton />,
        headerRight: <MenuButton />,
        headerStyle: Styles.header,
        headerTitleStyle: Styles.headerTitle
      };
    }
  }
});

const AppWithNavigationState = ({ dispatch, nav, language }) => (
  <AppNavigator
    screenProps={{ language: language }}
    navigation={addNavigationHelpers({
      dispatch,
      state: nav
    })}
  />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav,
  language: state.settings.language
});

export default connect(mapStateToProps)(AppWithNavigationState);
