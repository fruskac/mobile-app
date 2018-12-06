// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Text, Image } from "react-native";
import I18n from "react-native-i18n";

import HeaderAd from "../../components/HeaderAd/";
import ItemSingle from "../../components/ItemSingle/";
import * as Screen from "../../utils/Screen";

import CommonStyles from "../../styles/CommonStyles";
import type LocationData from "../../types";

type Props = {
  id: string,
  data: LocationData,
  onNavigate: (route: string) => void,
  navigation: any,
  language: string
};
type State = {};

class LocationSingle extends PureComponent<Props, State> {
  render() {
    const { id, data, onNavigate, language } = this.props;
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <TouchableOpacity
          onPress={() => {
            onNavigate("/map");
          }}
          key={id}
          style={CommonStyles.onMapBtn}
        >
          <Image source={require('../../assets/menu-icons-png/icons8-map-marker-24.png')} />
        </TouchableOpacity>
        <ItemSingle
          image={data.image}
          title={data.title}
          text={data.description}
          longText={data.description_long}
        />
      </View>
    );
  }
}

export default LocationSingle;
