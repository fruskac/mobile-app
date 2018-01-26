// @flow

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator } from "react-navigation";

import HomeScreen from "./components/Home";
import NewsScreen from "./components/News";
import MapScreen from "./components/Map";
import LocationsScreen from "./components/Locations";
import TrailsScreen from "./components/Trails";
import InfoScreen from "./components/Info";
import DonateScreen from "./components/Donate";

export const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  News: { screen: NewsScreen }
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state);
  return { nav: state.nav };
};

export default connect(mapStateToProps)(AppWithNavigationState);
