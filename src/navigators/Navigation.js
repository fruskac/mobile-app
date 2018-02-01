// @flow

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addNavigationHelpers, StackNavigator } from "react-navigation";

import HomeScreen from "../components/Home";
import NewsScreen from "../components/News";
import MapScreen from "../components/Map";
import LocationsScreen from "../components/Locations";
import TrailsScreen from "../components/Trails";
import InfoScreen from "../components/Info";
import DonateScreen from "../components/Donate";
import I18n from "react-native-i18n";
import Styles from "../Styles";

export const AppNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: navigation => ({
      title: I18n.t("home"),
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
  },
  News: {
    screen: NewsScreen,
    navigationOptions: navigation => ({
      title: I18n.t("news"),
      headerBackTitle: I18n.t("back"),
      headerStyle: Styles.header,
      headerTitleStyle: Styles.headerTitle
    })
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
