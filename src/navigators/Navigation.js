// @flow

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SafeAreaView, Text, View } from "react-native";
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
import { backgroundColor } from "../styles/CommonStyles";

const routeComponents = {
  Home: HomeScreen,
  News: NewsScreen,
  SingleNews: SingleNewsScreen,
  Map: MapScreen,
  Locations: LocationsScreen,
  LocationTypePlace: LocationTypePlaceScreen,
  LocationSingle: LocationSingleScreen,
  Trails: TrailsScreen,
  Info: InfoScreen,
  Donate: DonateScreen
};

function getRouteTitle(routeName, params) {
  switch (routeName) {
    case "Home":
      return I18n.t("home");
    case "News":
    case "SingleNews":
      return I18n.t("news");
    case "Map":
      return I18n.t("map");
    case "Locations":
      return I18n.t("locations");
    case "LocationTypePlace":
      return I18n.t((params && params.id) || "locations");
    case "LocationSingle":
      return I18n.t("location");
    case "Trails":
      return I18n.t("trails");
    case "Info":
      return I18n.t("info");
    case "Donate":
      return I18n.t("donate");
    default:
      return I18n.t("home");
  }
}

function renderScreen(routeName, params) {
  const ScreenComponent = routeComponents[routeName] || HomeScreen;
  return <ScreenComponent navigation={{ state: { params: params || {} } }} />;
}

const AppWithNavigationState = ({ nav }) => {
  const activeRoute =
    nav && Array.isArray(nav.routes) && typeof nav.index === "number"
      ? nav.routes[nav.index]
      : { routeName: "Home", params: {} };
  const routeName = (activeRoute && activeRoute.routeName) || "Home";
  const showHeaderActions = routeName !== "Home";
  const title = getRouteTitle(routeName, activeRoute && activeRoute.params);

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <SafeAreaView style={{ backgroundColor }}>
        <View style={Styles.header}>
          <View style={{ position: "absolute", left: 0, top: 0, bottom: 0 }}>
            {showHeaderActions ? <BackButton /> : null}
          </View>
          <Text style={Styles.headerTitle}>{title}</Text>
          <View style={{ position: "absolute", right: 0, top: 0, bottom: 0 }}>
            {showHeaderActions ? <MenuButton /> : null}
          </View>
        </View>
      </SafeAreaView>
      <View style={{ flex: 1 }}>{renderScreen(routeName, activeRoute && activeRoute.params)}</View>
    </View>
  );
};

AppWithNavigationState.propTypes = {
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
