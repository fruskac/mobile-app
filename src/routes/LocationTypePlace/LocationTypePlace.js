// @flow

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

import HeaderAd from "../../components/HeaderAd/";
import ItemList from "../../components/ItemList/";

import CommonStyles from "../../styles/CommonStyles";
import Styles from "./Styles";

export type LocationData = {
  title: string,
  id: string,
  link: string,
  description: string,
  image: string
};

type Props = {
  items: Array<LocationData>
};
type State = {};

class LocationTypePlace extends PureComponent<Props, State> {
  render() {
    const { items } = this.props;

    // console.log("ITEMS LOCATION", items);

    return (
      <View style={CommonStyles.container}>
        <HeaderAd />
        <Text style={Styles.text}>
          To be added later... diaspora per lorem ad astera astra borum dorum
          tulipsen
        </Text>
        <ItemList items={items} slug="/location-single/" />
      </View>
    );
  }
}

export default LocationTypePlace;
