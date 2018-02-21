// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import HeaderAd from "../../components/HeaderAd/";
import ItemSingle from "../../components/ItemSingle/";
import * as Screen from "../../utils/Screen";

import CommonStyles from "../../styles/CommonStyles";
import type { LocationData } from "../LocationTypePlace/LocationTypePlace";

type Props = {
  id: string,
  data: LocationData,
  navigation: any
};
type State = {};

class LocationSingle extends PureComponent<Props, State> {
  render() {
    const { data } = this.props;
    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
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
