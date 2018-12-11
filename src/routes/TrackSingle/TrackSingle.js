// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, TouchableOpacity, Text, Image } from "react-native";
import I18n from "react-native-i18n";
import { askPermissions } from "../../actions/locations";

import HeaderAd from "../../components/HeaderAd/";
import ItemSingle from "../../components/ItemSingle/";
import * as Screen from "../../utils/Screen";

import CommonStyles from "../../styles/CommonStyles";
import type LocationData from "../../types";

type Props = {
  id: string,
  data: LocationData,
  onNavigate: (route: string) => void,
  language: string,
  askPermissions: () => void,
};
type State = {};

class TrackSingle extends PureComponent<Props, State> {
  render() {
    const { id, data, onNavigate, language } = this.props;
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <TouchableOpacity
          onPress={async () => {
            const resp = await askPermissions();
            if (resp) {
              onNavigate("/track-map/"+data.id);
            }
          }}
          key={id}
          style={CommonStyles.onMapBtn}
        >
          <Image source={require('../../assets/menu-icons-png/icons8-waypoint-map-24.png')} />
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

export default TrackSingle;
