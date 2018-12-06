// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

import HeaderAd from "../../components/HeaderAd/";
import ItemList from "../../components/ItemList/";

import CommonStyles from "../../styles/CommonStyles";
import Styles from "./Styles";
import type LocationData from "../../types";

type Props = {
  items: Array<LocationData>,
  data: any
};
type State = {};

class LocationTypePlace extends PureComponent<Props, State> {
  render() {
    const { items, data } = this.props;

    return (
      <View style={CommonStyles.container}>
        <HeaderAd />

        <ItemList
          header={
            <Text style={Styles.text}>
              {data.description}
            </Text>
          }
          items={items}
          slug="/location-single/"
        />
      </View>
    );
  }
}

export default LocationTypePlace;
