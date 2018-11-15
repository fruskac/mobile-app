// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Text } from "react-native";
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
  navigation: any
};
type State = {};

class LocationSingle extends PureComponent<Props, State> {
  render() {
    const { id, data, onNavigate } = this.props;
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <TouchableOpacity
          onPress={() => console.log('open on maps')}
          key={id}
          style={CommonStyles.onMapBtn}
        >
          <Text style={[CommonStyles.text,{padding: 0, paddingHorizontal: 15}]}>{I18n.t("on map").toUpperCase()}</Text>
        </TouchableOpacity>
        <ItemSingle
          image={data.image}
          title={data.title}
          text={data.description}
        />
      </View>
    );
  }
}

export default LocationSingle;
